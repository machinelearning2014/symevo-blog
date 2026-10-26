#!/usr/bin/env node
// Static blog builder for GitHub Pages. No runtime server, no database.
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, realpath, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_REPO_ROOT = resolve(SCRIPT_DIR, "..");
const PAGE_SIZE = 8;

// ── small utilities ─────────────────────────────────────────────────────────

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

function escapeXml(value) {
  return escapeHtml(value);
}

function normalizeBaseUrl(value) {
  const raw = String(value ?? "/").trim();
  if (!raw || raw === "/") return "/";
  return `/${raw.replace(/^\/+/u, "").replace(/\/+$/u, "")}/`;
}

function absoluteUrl(origin, baseUrl, path = "") {
  const cleanOrigin = String(origin ?? "").replace(/\/+$/u, "");
  const cleanPath = String(path).replace(/^\/+/u, "");
  return `${cleanOrigin}${baseUrl}${cleanPath}`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatRssDate(date) {
  return date.toUTCString();
}

function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/gu, "")
    .trim()
    .replace(/[\s_]+/gu, "-")
    .replace(/-+/gu, "-")
    .replace(/^-|-$/gu, "")
    .slice(0, 80);
}

function buildLabelRoutes(labels) {
  const byBase = new Map();
  for (const label of [...labels].sort((left, right) => left.localeCompare(right))) {
    const base = slugify(label);
    const group = byBase.get(base) ?? [];
    group.push(label);
    byBase.set(base, group);
  }
  const routes = new Map();
  const used = new Set();
  for (const [base, group] of byBase) {
    for (const label of group) {
      const digest = createHash("sha256").update(label.toLowerCase()).digest("hex");
      let route = base && group.length === 1 ? base : `${base || "label"}-${digest.slice(0, 8)}`;
      let digestLength = 8;
      while (used.has(route)) {
        digestLength = Math.min(digest.length, digestLength + 4);
        route = `${base || "label"}-${digest.slice(0, digestLength)}`;
        if (digestLength === digest.length && used.has(route)) {
          throw new Error(`Could not allocate a unique route for label "${label}".`);
        }
      }
      used.add(route);
      routes.set(label.toLowerCase(), route);
    }
  }
  return routes;
}

function plainText(markdown) {
  return String(markdown ?? "")
    .replace(/```[\s\S]*?```/gu, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/gu, "$1")
    .replace(/<[^>]+>/gu, " ")
    .replace(/[#>*_~`|]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function excerpt(markdown, limit = 190) {
  const text = plainText(markdown);
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const boundary = cut.lastIndexOf(" ");
  return `${(boundary > 80 ? cut.slice(0, boundary) : cut).replace(/[.,;:!?-]+$/u, "")}…`;
}

function readingMinutes(markdown) {
  const words = plainText(markdown).split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function safeHref(href) {
  const value = String(href ?? "").trim();
  if (!value) return false;
  if (/^(?:javascript|vbscript|data):/iu.test(value)) return false;
  return /^(?:https?:|mailto:|#|\/|\.{1,2}\/|[\w.-]+(?:\/|$))/u.test(value);
}

function isExternal(href) {
  return /^(?:https?:)?\/\//iu.test(String(href ?? ""));
}

function isPlainAsset(path) {
  return /^assets\//u.test(String(path ?? "")) && !String(path).split("/").includes("..");
}

// ── markdown rendering ──────────────────────────────────────────────────────

function createRenderer(baseUrl) {
  const renderer = new marked.Renderer();

  const asset = (href) => {
    const value = String(href ?? "").trim();
    if (!value || isExternal(value) || value.startsWith("#") || value.startsWith("data:")) {
      return value;
    }
    if (value.startsWith("/")) return `${baseUrl}${value.replace(/^\/+/u, "")}`;
    if (value.startsWith("assets/")) return `${baseUrl}${value}`;
    return value;
  };

  // Raw HTML is not part of the authoring format. Dropping it keeps posts
  // portable between static hosts and removes a script-injection surface.
  renderer.html = () => "";

  renderer.heading = function heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const id = slugify(plainText(text));
    return `<h${depth}${id ? ` id="${escapeAttribute(id)}"` : ""}>${text}</h${depth}>\n`;
  };

  renderer.link = function link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const value = String(href ?? "");
    if (!safeHref(value)) return text;
    const external = isExternal(value);
    const attrs = [
      `href="${escapeAttribute(asset(value))}"`,
      title ? `title="${escapeAttribute(title)}"` : "",
      external ? 'target="_blank" rel="noopener noreferrer"' : "",
    ].filter(Boolean).join(" ");
    return `<a ${attrs}>${text}</a>`;
  };

  renderer.image = function image({ href, title, text }) {
    const value = asset(href);
    const alt = String(text ?? "").trim() || "Illustration";
    const img = `<img src="${escapeAttribute(value)}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async">`;
    if (!title) return img;
    return `<figure class="post-figure">${img}<figcaption>${escapeHtml(title)}</figcaption></figure>`;
  };

  return renderer;
}

function renderMarkdown(markdown, baseUrl) {
  const html = marked.parse(String(markdown ?? ""), {
    renderer: createRenderer(baseUrl),
    gfm: true,
    breaks: false,
  });
  // Marked treats an image as an inline token and wraps it in <p>. Our
  // captioned images render as <figure>, which is block content; unwrap the
  // paragraph so the document stays valid.
  return html.replace(
    /<p>\s*(<figure class="post-figure">[\s\S]*?<\/figure>)\s*<\/p>/gu,
    "$1",
  );
}

// ── content loading ─────────────────────────────────────────────────────────

function normalizeLabels(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  const labels = [];
  for (const entry of value) {
    const label = String(entry ?? "").trim();
    const key = label.toLowerCase();
    if (!label || seen.has(key)) continue;
    seen.add(key);
    labels.push(label);
  }
  return labels;
}

function normalizeGallery(value, postSlug) {
  if (!Array.isArray(value)) return [];
  return value.map((entry, index) => {
    if (!entry || typeof entry !== "object") {
      throw new Error(`Post ${postSlug}: gallery entry ${index + 1} must be an object.`);
    }
    const src = String(entry.src ?? "").trim();
    const alt = String(entry.alt ?? "").trim();
    if (!src) throw new Error(`Post ${postSlug}: gallery entry ${index + 1} is missing src.`);
    if (!alt) throw new Error(`Post ${postSlug}: gallery entry ${index + 1} is missing alt text.`);
    if (!safeHref(src)) throw new Error(`Post ${postSlug}: gallery entry ${index + 1} has an unsafe src.`);
    return {
      src,
      alt,
      ...(String(entry.caption ?? "").trim() ? { caption: String(entry.caption).trim() } : {}),
    };
  });
}

async function loadPost(filePath, options) {
  const raw = await readFile(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data ?? {};
  const slug = String(data.slug ?? basename(filePath, ".md")).trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug)) {
    throw new Error(`Post ${basename(filePath)}: slug must be lower-case words separated by hyphens.`);
  }
  const title = String(data.title ?? "").trim();
  if (!title) throw new Error(`Post ${slug}: title is required.`);
  const date = new Date(String(data.date ?? ""));
  if (Number.isNaN(date.getTime())) throw new Error(`Post ${slug}: date must be an ISO date.`);
  if (typeof data.draft !== "boolean") {
    throw new Error(`Post ${slug}: draft must be explicitly true or false.`);
  }
  const draft = data.draft;
  if (draft && !options.includeDrafts) return undefined;
  const labels = normalizeLabels(data.labels);
  const cover = String(data.cover_image ?? "").trim();
  const coverAlt = String(data.cover_alt ?? "").trim();
  if (cover && !coverAlt) throw new Error(`Post ${slug}: cover_alt is required when cover_image is set.`);
  if (cover && !safeHref(cover)) throw new Error(`Post ${slug}: cover_image has an unsafe path.`);
  if (cover && !isExternal(cover) && !isPlainAsset(cover)) {
    throw new Error(`Post ${slug}: local cover_image must live under the source assets directory (assets/...).`);
  }
  if (cover && !isExternal(cover)) await validateLocalAsset(cover, options.assetsDir, `Post ${slug} cover_image`);
  const gallery = normalizeGallery(data.gallery, slug);
  for (const item of gallery) {
    if (!isExternal(item.src) && !isPlainAsset(item.src)) {
      throw new Error(`Post ${slug}: local gallery images must live under the source assets directory (assets/...).`);
    }
    if (!isExternal(item.src)) await validateLocalAsset(item.src, options.assetsDir, `Post ${slug} gallery image`);
  }
  const markdownTokens = marked.lexer(parsed.content, { gfm: true });
  const inlineImages = [];
  marked.walkTokens(markdownTokens, (token) => {
    if (token.type === "image") inlineImages.push(String(token.href ?? "").trim());
  });
  for (const src of inlineImages) {
    if (!safeHref(src)) throw new Error(`Post ${slug}: inline image has an unsafe src.`);
    if (!isExternal(src) && !isPlainAsset(src)) {
      throw new Error(`Post ${slug}: local inline images must live under the source assets directory (assets/...).`);
    }
    if (!isExternal(src)) await validateLocalAsset(src, options.assetsDir, `Post ${slug} inline image`);
  }
  return {
    slug,
    title,
    date,
    draft,
    labels,
    summary: String(data.summary ?? "").trim() || excerpt(parsed.content),
    cover: cover || undefined,
    coverAlt: coverAlt || undefined,
    gallery,
    body: parsed.content,
    html: renderMarkdown(parsed.content, options.baseUrl),
    readingMinutes: readingMinutes(parsed.content),
  };
}

async function validateLocalAsset(path, assetsDir, description) {
  const root = await realpath(assetsDir);
  const candidate = resolve(assetsDir, String(path).replace(/^assets\//u, ""));
  let actual;
  try {
    actual = await realpath(candidate);
  } catch {
    throw new Error(`${description} does not exist: ${path}`);
  }
  if (actual !== root && !actual.startsWith(`${root}${sep}`)) {
    throw new Error(`${description} resolves outside the source assets directory: ${path}`);
  }
  if (!(await stat(actual)).isFile()) throw new Error(`${description} is not a file: ${path}`);
}

async function loadPage(filePath, options) {
  if (!existsSync(filePath)) return undefined;
  const parsed = matter(await readFile(filePath, "utf8"));
  return {
    title: String(parsed.data?.title ?? "Page"),
    html: renderMarkdown(parsed.content, options.baseUrl),
  };
}

// ── HTML templates ──────────────────────────────────────────────────────────

function assetUrl(options, path) {
  const value = String(path ?? "").trim();
  if (!value) return "";
  if (isExternal(value) || value.startsWith("data:")) return value;
  if (value.startsWith("/")) return `${options.baseUrl}${value.replace(/^\/+/u, "")}`;
  return `${options.baseUrl}${value}`;
}

function canonicalFor(options, path) {
  return absoluteUrl(options.site.origin, options.baseUrl, path);
}

function pageHref(options, page) {
  return page <= 1 ? options.baseUrl : `${options.baseUrl}page/${page}/`;
}

function postHref(options, post) {
  return `${options.baseUrl}posts/${post.slug}/`;
}

function labelHref(options, label) {
  const route = options.labelRoutes.get(String(label).toLowerCase());
  if (!route) throw new Error(`No route was allocated for label "${label}".`);
  return `${options.baseUrl}labels/${route}/`;
}

function renderNav(options, current) {
  return (options.site.nav ?? [])
    .map((item) => {
      const href = item.href ? `${options.baseUrl}${item.href}` : options.baseUrl;
      const active = String(item.href ?? "") === current ? ' aria-current="page"' : "";
      return `<a href="${escapeAttribute(href)}"${active}>${escapeHtml(item.label)}</a>`;
    })
    .join("");
}

function renderSidebar(options, posts, labels) {
  const author = options.site.author ?? {};
  const avatar = author.avatar ? assetUrl(options, author.avatar) : "";
  const labelLinks = [...labels.entries()]
    .sort((left, right) => right[1].length - left[1].length)
    .slice(0, 12)
    .map(([label, items]) =>
      `<li><a href="${escapeAttribute(labelHref(options, label))}">${escapeHtml(label)}<span>${items.length}</span></a></li>`
    )
    .join("");
  const years = [...new Set(posts.map((post) => post.date.getUTCFullYear()))]
    .sort((left, right) => right - left)
    .map((year) => `<li><a href="${options.baseUrl}archive/#${year}">${year}</a></li>`)
    .join("");
  const social = (options.site.social ?? [])
    .map((item) => `<a href="${escapeAttribute(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.label)}</a>`)
    .join("");
  return `
<aside class="sidebar" aria-label="Blog sidebar">
  <section class="side-card profile-card">
    ${avatar ? `<img class="avatar" src="${escapeAttribute(avatar)}" alt="${escapeAttribute(author.name ?? "Author")}" width="72" height="72">` : ""}
    <h2>${escapeHtml(author.name ?? options.site.title)}</h2>
    <p>${escapeHtml(author.bio ?? options.site.description ?? "")}</p>
    ${social ? `<div class="social-links">${social}</div>` : ""}
  </section>
  <section class="side-card">
    <h2>Search</h2>
    <form class="sidebar-search" action="${options.baseUrl}search/" method="get" role="search">
      <label class="sr-only" for="sidebar-q">Search posts</label>
      <input id="sidebar-q" name="q" type="search" placeholder="Search the journal…" autocomplete="off">
      <button type="submit">Search</button>
    </form>
  </section>
  <section class="side-card">
    <h2>Labels</h2>
    <ul class="label-list">${labelLinks || "<li class=\"muted\">No labels yet</li>"}</ul>
  </section>
  <section class="side-card">
    <h2>Archive</h2>
    <ul class="archive-list">${years || "<li class=\"muted\">No posts yet</li>"}</ul>
  </section>
  <section class="side-card">
    <h2>Recent posts</h2>
    <ul class="recent-list">
      ${posts.slice(0, 5).map((post) => `<li><a href="${escapeAttribute(postHref(options, post))}">${escapeHtml(post.title)}</a><span>${escapeHtml(formatShortDate(post.date))}</span></li>`).join("") || "<li class=\"muted\">No posts yet</li>"}
    </ul>
  </section>
</aside>`;
}

function pageShell(options, { title, description, canonicalPath, bodyClass = "", dataPage = "", content, sidebar = "" }) {
  const site = options.site;
  const canonical = canonicalFor(options, canonicalPath ?? "");
  const ogImage = site.origin && options.socialImage
    ? absoluteUrl(site.origin, options.baseUrl, options.socialImage)
    : "";
  return `<!doctype html>
<html lang="en" data-theme="auto">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeAttribute(description ?? site.description ?? "")}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="generator" content="SYMEVO static blog">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; script-src 'self'; base-uri 'self'; form-action 'self'">
<link rel="canonical" href="${escapeAttribute(canonical)}">
<link rel="alternate" type="application/rss+xml" title="${escapeAttribute(site.title)}" href="${options.baseUrl}feed.xml">
<link rel="stylesheet" href="${options.baseUrl}theme/style.css">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeAttribute(title)}">
<meta property="og:description" content="${escapeAttribute(description ?? site.description ?? "")}">
<meta property="og:url" content="${escapeAttribute(canonical)}">
${ogImage ? `<meta property="og:image" content="${escapeAttribute(ogImage)}">` : ""}
<meta name="twitter:card" content="summary_large_image">
</head>
<body class="${escapeAttribute(bodyClass)}" data-page="${escapeAttribute(dataPage)}" data-search-index="${options.baseUrl}search.json">
<a class="skip-link" href="#main">Skip to content</a>
<div class="ambient-grid" aria-hidden="true"></div>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="${options.baseUrl}" aria-label="${escapeAttribute(site.title)} home">
      ${site.author?.avatar ? `<img class="brand-icon" src="${escapeAttribute(assetUrl(options, site.author.avatar))}" alt="" width="42" height="42">` : ""}
      <span class="brand-copy">
        <span class="brand-title">${escapeHtml(site.title)}</span>
        <span class="brand-tagline">${escapeHtml(site.tagline ?? "")}</span>
      </span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav id="site-nav" class="site-nav" aria-label="Primary">${renderNav(options, options.currentNav ?? "")}</nav>
    <button class="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode"><span aria-hidden="true">◐</span><span class="theme-label">Mode</span></button>
  </div>
</header>
<div class="layout">
  <main id="main" class="content">
    ${content}
  </main>
  ${sidebar}
</div>
<footer class="site-footer">
  <div class="footer-inner">
    <p><span class="status-dot" aria-hidden="true"></span> © ${new Date().getUTCFullYear()} ${escapeHtml(site.author?.name ?? site.title)}. Evidence before confidence.</p>
    <p><a href="${options.baseUrl}feed.xml">RSS</a> · <a href="${options.baseUrl}sitemap.xml">Sitemap</a></p>
  </div>
</footer>
<dialog class="lightbox" id="lightbox" aria-label="Image viewer">
  <button class="lightbox-close" type="button" aria-label="Close image viewer">×</button>
  <figure>
    <img alt="">
    <figcaption></figcaption>
  </figure>
</dialog>
<script src="${options.baseUrl}theme/blog.js" defer></script>
</body>
</html>`;
}

function postCard(options, post, { featured = false } = {}) {
  const cover = post.cover
    ? `<a class="card-cover" href="${escapeAttribute(postHref(options, post))}" tabindex="-1" aria-hidden="true"><img src="${escapeAttribute(assetUrl(options, post.cover))}" alt="" loading="lazy" decoding="async"></a>`
    : "";
  const labels = post.labels
    .map((label) => `<a class="chip" href="${escapeAttribute(labelHref(options, label))}">${escapeHtml(label)}</a>`)
    .join("");
  return `
<article class="post-card${featured ? " featured" : ""}${post.cover ? " has-cover" : ""}">
  ${cover}
  <div class="card-body">
    <p class="card-meta"><time datetime="${post.date.toISOString()}">${escapeHtml(formatShortDate(post.date))}</time><span aria-hidden="true">·</span><span>${post.readingMinutes} min read</span></p>
    <h2 class="card-title"><a href="${escapeAttribute(postHref(options, post))}">${escapeHtml(post.title)}</a></h2>
    <p class="card-summary">${escapeHtml(post.summary)}</p>
    <div class="card-foot">
      <div class="chips">${labels}</div>
      <a class="read-more" href="${escapeAttribute(postHref(options, post))}">Read more <span aria-hidden="true">→</span></a>
    </div>
  </div>
</article>`;
}

function renderHome(options, posts, page) {
  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const slice = posts.slice(start, start + PAGE_SIZE);
  const featured = page === 1 ? slice[0] : undefined;
  const rest = featured ? slice.slice(1) : slice;
  const pinned = featured
    ? `<section class="featured-wrap">${postCard(options, featured, { featured: true })}</section>`
    : "";
  const cards = rest.map((post) => postCard(options, post)).join("");
  const pagination = pages > 1
    ? `<nav class="pagination" aria-label="Pagination">
        ${page > 1 ? `<a class="page-prev" href="${escapeAttribute(pageHref(options, page - 1))}">← Newer</a>` : `<span></span>`}
        <span class="page-count">Page ${page} of ${pages}</span>
        ${page < pages ? `<a class="page-next" href="${escapeAttribute(pageHref(options, page + 1))}">Older →</a>` : `<span></span>`}
      </nav>`
    : "";
  const content = `
    <section class="home-intro">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> Runtime notes · 2026</p>
        <h1>${escapeHtml(options.site.homeTitle ?? options.site.title)}</h1>
        <p class="intro-copy">${escapeHtml(options.site.description ?? "")}</p>
        <div class="hero-actions">
          <a class="button" href="${options.baseUrl}archive/">Explore the archive <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="${options.baseUrl}about/">How SYMEVO works <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <ol class="verification-loop" aria-label="SYMEVO verification loop">
        <li><span>01</span><div><strong>Evidence</strong><small>Observe the world</small></div></li>
        <li><span>02</span><div><strong>Derivation</strong><small>Make the logic explicit</small></div></li>
        <li><span>03</span><div><strong>Verdict</strong><small>Publish only what holds</small></div></li>
      </ol>
    </section>
    <div class="section-heading"><p class="eyebrow">Latest transmission</p><span>${posts.length} verified ${posts.length === 1 ? "entry" : "entries"}</span></div>
    ${pinned}
    <section class="post-list" aria-label="More writing">${cards || `<p class="empty-state">No posts yet. Add a Markdown file with <code>blog_post</code>.</p>`}</section>
    ${pagination}`;
  return pageShell(options, {
    title: page === 1 ? options.site.title : `${options.site.title} — page ${page}`,
    description: options.site.description,
    canonicalPath: page === 1 ? "" : `page/${page}/`,
    bodyClass: "home",
    dataPage: "home",
    content,
    sidebar: renderSidebar(options, posts, options.labels),
  });
}

function renderPost(options, post, previous, next, related) {
  const cover = post.cover
    ? `<figure class="post-hero"><img src="${escapeAttribute(assetUrl(options, post.cover))}" alt="${escapeAttribute(post.coverAlt ?? "")}" decoding="async"></figure>`
    : "";
  const labels = post.labels
    .map((label) => `<a class="chip" href="${escapeAttribute(labelHref(options, label))}">${escapeHtml(label)}</a>`)
    .join("");
  const gallery = post.gallery.length
    ? `<section class="post-gallery" aria-label="Image gallery">${post.gallery
        .map((item) => `<figure><img src="${escapeAttribute(assetUrl(options, item.src))}" alt="${escapeAttribute(item.alt)}" loading="lazy" decoding="async">${item.caption ? `<figcaption>${escapeHtml(item.caption)}</figcaption>` : ""}</figure>`)
        .join("")}</section>`
    : "";
  const relatedCards = related.length
    ? `<section class="related"><h2>More like this</h2><div class="related-grid">${related.map((item) => postCard(options, item)).join("")}</div></section>`
    : "";
  const nav = previous || next
    ? `<nav class="post-nav" aria-label="Post navigation">
        ${previous ? `<a class="post-nav-prev" href="${escapeAttribute(postHref(options, previous))}"><span>Newer</span>${escapeHtml(previous.title)}</a>` : `<span></span>`}
        ${next ? `<a class="post-nav-next" href="${escapeAttribute(postHref(options, next))}"><span>Older</span>${escapeHtml(next.title)}</a>` : `<span></span>`}
      </nav>`
    : "";
  const shareUrl = options.site.origin
    ? absoluteUrl(options.site.origin, options.baseUrl, `posts/${post.slug}/`)
    : `${options.baseUrl}posts/${post.slug}/`;
  const share = `<div class="share"><span>Share</span>
    <a href="https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&amp;url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer">X</a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <button type="button" class="copy-link" data-url="${escapeAttribute(shareUrl)}">Copy link</button>
  </div>`;
  const content = `
    <article class="post">
      <header class="post-header">
        <div class="chips">${labels}</div>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="post-meta"><time datetime="${post.date.toISOString()}">${escapeHtml(formatDate(post.date))}</time><span aria-hidden="true">·</span><span>${post.readingMinutes} min read</span></p>
        ${post.summary ? `<p class="post-deck">${escapeHtml(post.summary)}</p>` : ""}
      </header>
      ${cover}
      <div class="post-content">${post.html}</div>
      ${gallery}
      <footer class="post-footer">
        ${share}
      </footer>
    </article>
    ${nav}
    ${relatedCards}`;
  return pageShell(options, {
    title: `${post.title} — ${options.site.title}`,
    description: post.summary,
    canonicalPath: `posts/${post.slug}/`,
    bodyClass: "post-page",
    dataPage: "post",
    content,
    sidebar: renderSidebar(options, options.posts, options.labels),
  });
}

function renderArchive(options) {
  const byYear = new Map();
  for (const post of options.posts) {
    const year = post.date.getUTCFullYear();
    const list = byYear.get(year) ?? [];
    list.push(post);
    byYear.set(year, list);
  }
  const groups = [...byYear.entries()]
    .sort((left, right) => right[0] - left[0])
    .map(([year, posts]) => `
      <section class="archive-group" id="${year}">
        <h2>${year}</h2>
        <ul>${posts.map((post) => `<li><time datetime="${post.date.toISOString()}">${escapeHtml(formatShortDate(post.date))}</time><a href="${escapeAttribute(postHref(options, post))}">${escapeHtml(post.title)}</a></li>`).join("")}</ul>
      </section>`)
    .join("");
  return pageShell(options, {
    title: `Archive — ${options.site.title}`,
    description: `Every post in ${options.site.title}, grouped by year.`,
    canonicalPath: "archive/",
    bodyClass: "archive-page",
    dataPage: "archive",
    content: `<section class="page-intro"><p class="eyebrow">Everything</p><h1>Archive</h1></section>${groups || `<p class="empty-state">No posts yet.</p>`}`,
    sidebar: renderSidebar(options, options.posts, options.labels),
  });
}

function renderLabels(options) {
  const items = [...options.labels.entries()]
    .sort((left, right) => right[1].length - left[1].length || left[0].localeCompare(right[0]))
    .map(([label, posts]) => `<a class="label-card" href="${escapeAttribute(labelHref(options, label))}"><strong>${escapeHtml(label)}</strong><span>${posts.length} ${posts.length === 1 ? "post" : "posts"}</span></a>`)
    .join("");
  return pageShell(options, {
    title: `Labels — ${options.site.title}`,
    description: `Browse ${options.site.title} by label.`,
    canonicalPath: "labels/",
    bodyClass: "labels-page",
    dataPage: "labels",
    content: `<section class="page-intro"><p class="eyebrow">Browse</p><h1>Labels</h1></section><div class="label-grid">${items || `<p class="empty-state">No labels yet.</p>`}</div>`,
    sidebar: renderSidebar(options, options.posts, options.labels),
  });
}

function renderLabel(options, label, posts) {
  return pageShell(options, {
    title: `Label: ${label} — ${options.site.title}`,
    description: `Posts labelled ${label}.`,
    canonicalPath: `labels/${slugify(label)}/`,
    bodyClass: "label-page",
    dataPage: "label",
    content: `<section class="page-intro"><p class="eyebrow">Label</p><h1>${escapeHtml(label)}</h1><p>${posts.length} ${posts.length === 1 ? "post" : "posts"}</p></section><section class="post-list">${posts.map((post) => postCard(options, post)).join("")}</section>`,
    sidebar: renderSidebar(options, options.posts, options.labels),
  });
}

function renderSearch(options) {
  return pageShell(options, {
    title: `Search — ${options.site.title}`,
    description: `Search ${options.site.title}.`,
    canonicalPath: "search/",
    bodyClass: "search-page",
    dataPage: "search",
    content: `<section class="page-intro"><p class="eyebrow">Find</p><h1>Search</h1></section>
      <form class="search-form" role="search"><label class="sr-only" for="q">Search posts</label><input id="q" name="q" type="search" placeholder="Search titles, summaries, and labels…" autocomplete="off" autofocus><button type="submit">Search</button></form>
      <p class="search-status" role="status" aria-live="polite"></p>
      <div class="search-results"></div>`,
    sidebar: renderSidebar(options, options.posts, options.labels),
  });
}

function renderAbout(options, page) {
  return pageShell(options, {
    title: `${page.title} — ${options.site.title}`,
    description: options.site.description,
    canonicalPath: "about/",
    bodyClass: "about-page",
    dataPage: "about",
    content: `<article class="page"><header class="post-header"><p class="eyebrow">About</p><h1>${escapeHtml(page.title)}</h1></header><div class="post-content">${page.html}</div></article>`,
    sidebar: renderSidebar(options, options.posts, options.labels),
  });
}

function renderNotFound(options) {
  return pageShell(options, {
    title: `Page not found — ${options.site.title}`,
    description: "That page does not exist.",
    canonicalPath: "404.html",
    bodyClass: "not-found",
    dataPage: "404",
    content: `<section class="page-intro"><p class="eyebrow">404</p><h1>That page wandered off.</h1><p>The link may be old, or the post may have moved.</p><p><a class="button" href="${options.baseUrl}">Back to the journal</a></p></section>`,
    sidebar: renderSidebar(options, options.posts, options.labels),
  });
}

// ── feeds and indexes ───────────────────────────────────────────────────────

function renderSearchIndex(options) {
  const items = options.posts.map((post) => ({
    title: post.title,
    url: postHref(options, post),
    summary: post.summary,
    labels: post.labels,
    date: post.date.toISOString(),
    cover: post.cover ? assetUrl(options, post.cover) : "",
  }));
  return JSON.stringify(items, null, 2);
}

function renderFeed(options) {
  const origin = String(options.site.origin ?? "").replace(/\/+$/u, "");
  const home = absoluteUrl(origin, options.baseUrl, "");
  const items = options.posts.slice(0, 30).map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(absoluteUrl(origin, options.baseUrl, `posts/${post.slug}/`))}</link>
      <guid isPermaLink="true">${escapeXml(absoluteUrl(origin, options.baseUrl, `posts/${post.slug}/`))}</guid>
      <pubDate>${escapeXml(formatRssDate(post.date))}</pubDate>
      <description>${escapeXml(post.summary)}</description>
      ${post.labels.map((label) => `<category>${escapeXml(label)}</category>`).join("")}
    </item>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(options.site.title)}</title>
    <link>${escapeXml(home)}</link>
    <description>${escapeXml(options.site.description ?? "")}</description>
    <language>en</language>
    <atom:link href="${escapeXml(`${home}feed.xml`)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

function renderSitemap(options) {
  const origin = options.site.origin;
  if (!origin) return "";
  const urls = [
    { path: "", priority: "1.0" },
    { path: "archive/", priority: "0.6" },
    { path: "labels/", priority: "0.6" },
    { path: "about/", priority: "0.5" },
    ...options.posts.map((post) => ({ path: `posts/${post.slug}/`, priority: "0.8" })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url><loc>${escapeXml(absoluteUrl(origin, options.baseUrl, item.path))}</loc><priority>${item.priority}</priority></url>`).join("\n")}
</urlset>`;
}

function renderRobots(options) {
  const origin = String(options.site.origin ?? "").replace(/\/+$/u, "");
  if (!origin) return "User-agent: *\nAllow: /\n";
  return `User-agent: *\nAllow: /\nSitemap: ${origin}${options.baseUrl}sitemap.xml\n`;
}

// ── build ───────────────────────────────────────────────────────────────────

async function writePage(outDir, path, html) {
  const target = path === "" ? join(outDir, "index.html") : join(outDir, path, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  return target;
}

export async function buildBlog(options = {}) {
  const repoRoot = options.repoRoot ?? DEFAULT_REPO_ROOT;
  const contentDir = options.contentDir ?? join(repoRoot, "blog/content");
  const themeDir = options.themeDir ?? join(repoRoot, "blog/theme");
  const assetsDir = options.assetsDir ?? join(repoRoot, "blog/assets");
  const outDir = options.outDir ?? join(repoRoot, "blog/_site");
  const baseUrl = normalizeBaseUrl(options.baseUrl ?? process.env.BLOG_BASE_URL ?? "/");
  const includeDrafts = options.includeDrafts ?? process.env.BLOG_INCLUDE_DRAFTS === "1";
  const site = JSON.parse(await readFile(join(contentDir, "site.json"), "utf8"));
  if (!site.title) throw new Error("The remote blog source content/site.json must define a title.");

  const postsDir = join(contentDir, "posts");
  const files = (await readdir(postsDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => join(postsDir, entry.name));
  const loaded = [];
  const seenSlugs = new Set();
  for (const file of files) {
    const post = await loadPost(file, { includeDrafts, baseUrl, assetsDir });
    if (!post) continue;
    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate post slug "${post.slug}" (${basename(file)}).`);
    }
    seenSlugs.add(post.slug);
    loaded.push(post);
  }
  const posts = loaded.sort((left, right) => right.date - left.date || left.slug.localeCompare(right.slug));
  const labelGroups = new Map();
  for (const post of posts) {
    for (const label of post.labels) {
      const key = label.toLowerCase();
      const group = labelGroups.get(key) ?? { label, posts: [] };
      group.posts.push(post);
      labelGroups.set(key, group);
    }
  }
  const labels = new Map([...labelGroups.values()].map((group) => [group.label, group.posts]));
  const labelRoutes = buildLabelRoutes(labels.keys());
  const templateOptions = {
    site,
    baseUrl,
    posts,
    labels,
    labelRoutes,
    socialImage: posts.find((post) => post.cover)?.cover,
  };

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(themeDir, join(outDir, "theme"), { recursive: true });
  await cp(assetsDir, join(outDir, "assets"), { recursive: true });

  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  for (let page = 1; page <= pages; page += 1) {
    await writePage(outDir, page === 1 ? "" : `page/${page}`, renderHome(templateOptions, posts, page));
  }

  for (let index = 0; index < posts.length; index += 1) {
    const post = posts[index];
    const related = posts
      .filter((candidate) => candidate.slug !== post.slug)
      .map((candidate) => ({
        post: candidate,
        shared: candidate.labels.filter((label) => post.labels.includes(label)).length,
      }))
      .filter((entry) => entry.shared > 0)
      .sort((left, right) => right.shared - left.shared || right.post.date - left.post.date)
      .slice(0, 2)
      .map((entry) => entry.post);
    await writePage(outDir, `posts/${post.slug}`, renderPost(
      templateOptions,
      post,
      posts[index - 1],
      posts[index + 1],
      related,
    ));
  }

  await writePage(outDir, "archive", renderArchive(templateOptions));
  await writePage(outDir, "labels", renderLabels(templateOptions));
  for (const [label, items] of labels) {
    await writePage(outDir, `labels/${labelRoutes.get(label.toLowerCase())}`, renderLabel(templateOptions, label, items));
  }
  await writePage(outDir, "search", renderSearch(templateOptions));
  const about = await loadPage(join(contentDir, "about.md"), { baseUrl });
  if (about) await writePage(outDir, "about", renderAbout(templateOptions, about));
  await writeFile(join(outDir, "404.html"), renderNotFound(templateOptions), "utf8");
  await writeFile(join(outDir, "search.json"), renderSearchIndex(templateOptions), "utf8");
  await writeFile(join(outDir, "feed.xml"), renderFeed(templateOptions), "utf8");
  await writeFile(join(outDir, "robots.txt"), renderRobots(templateOptions), "utf8");
  const sitemap = renderSitemap(templateOptions);
  if (sitemap) await writeFile(join(outDir, "sitemap.xml"), sitemap, "utf8");

  return { outDir, posts: posts.length, labels: labels.size, baseUrl };
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--drafts") options.includeDrafts = true;
    else if (arg === "--repo-root") options.repoRoot = argv[++index];
    else if (arg === "--base-url") options.baseUrl = argv[++index];
    else if (arg === "--out") options.outDir = argv[++index];
    else if (arg === "--help" || arg === "-h") {
      console.log("Usage: node scripts/build-blog.mjs [--repo-root dir] [--drafts] [--base-url /repo/] [--out dir]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await buildBlog(parseArgs(process.argv.slice(2)));
    console.log(`Built ${result.posts} posts with ${result.labels} labels → ${result.outDir} (base ${result.baseUrl})`);
  } catch (error) {
    console.error(`Blog build failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
