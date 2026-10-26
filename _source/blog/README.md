# SYMEVO Journal

A static, Blogger-classic-inspired blog that deploys to GitHub Pages. Posts are Markdown files with front matter; images live under `blog/assets/`; a small Node script builds the HTML.

## Layout

```
blog/
  content/
    posts/<slug>.md        one Markdown file per post
    about.md               the About page
    site.json              title, tagline, author, navigation, social links
  theme/
    style.css              the whole theme
    blog.js                theme toggle, lightbox, search
  assets/
    images/                covers, galleries, avatar
  _site/                   generated output (gitignored)
scripts/build-blog.mjs     the static generator
scripts/serve-blog.mjs     local preview server
```

## Local preview

```bash
npm run blog:build
npm run blog:serve
# http://127.0.0.1:4173/
```

To include drafts:

```bash
BLOG_INCLUDE_DRAFTS=1 npm run blog:build
```

To preview under the project-site path:

```bash
BLOG_BASE_URL=/evo-ai-v2/ npm run blog:build
npm run blog:serve
```

## Writing a post

Create `blog/content/posts/<slug>.md`. The slug must be lower-case words separated by hyphens and must be unique.

```markdown
---
title: "A title"
date: "2026-10-25T12:00:00Z"
summary: "One or two sentences used on the home page and in search."
labels: ["agents", "design"]
cover_image: "assets/images/posts/<slug>/cover.jpg"
cover_alt: "Describe the cover for screen readers."
gallery:
  - src: "assets/images/posts/<slug>/one.jpg"
    alt: "Describe the first image."
    caption: "Optional caption."
draft: false
---

Markdown body.
```

Rules enforced by the build:

- `title` and a valid ISO `date` are required.
- `draft` must be explicitly `true` or `false`; missing or malformed values fail closed.
- `slug` is derived from the filename unless the front matter sets it.
- If `cover_image` is present, `cover_alt` is required.
- Every gallery entry needs `alt`.
- Local images must exist under `blog/assets/` and use an `assets/...` path.
- Drafts are excluded unless `BLOG_INCLUDE_DRAFTS=1`.

## Images

Put images in `blog/assets/images/posts/<slug>/`. Prefer WebP or JPEG for photographs and SVG or PNG for diagrams. Keep files under a few megabytes; GitHub Pages serves them as static files and the 1 GB repository limit applies to everything.

Inline image with a caption:

```markdown
![Short alt text](assets/images/posts/<slug>/figure.jpg "Visible caption")
```

An image with a title renders as a `<figure>` with a caption. Without a title it renders as a plain `<img>`. Every image is lazy-loaded and clickable for the lightbox.

A post becomes an “image post” by adding `cover_image` and/or `gallery`. The cover appears on the home card and as the post hero; the gallery renders below the prose.

## Deployment

The runtime repository (`evo-ai-v2`) is private. Published blog history belongs
to a separate **public** repository:

- Local authoring/build assets: `machinelearning2014/evo-ai-v2` (private)
- Published site and archived source: `machinelearning2014/symevo-blog` (public)
- URL: `https://machinelearning2014.github.io/symevo-blog/`

`blog_post action=publish` builds the site in a temporary directory and uses the
GitHub Git Data API to create one atomic commit on `symevo-blog/main`. That
commit contains the generated Pages site at the repository root and a
`draft: false` source snapshot under `_source/blog/`. The original local draft
is restored after every attempt. It never stages, commits, or pushes the
`evo-ai-v2` workspace. The local workflow only validates that the blog builds.

### One-time setup

1. Set `GITHUB_TOKEN` to a fine-grained token with **Contents: Read and write**
   access to `machinelearning2014/symevo-blog`.

2. In `machinelearning2014/symevo-blog`, open **Settings → Pages** and set
   **Source** to **Deploy from a branch**, branch `main`, folder `/ (root)`.

3. Ask SYMEVO to publish a post. The terminal CODE publication phase calls
   `blog_post` with `action=publish` and `confirm=true`.

A custom domain can be added later under the `symevo-blog` Pages settings. The
generator's `site.origin` is used for canonical and RSS URLs.

## What is not included

- **Comments.** A static site has no server. If comments are needed, add Giscus or utterances later; both use GitHub Discussions/issues and require a small script include.
- **A browser upload editor.** Images are added by committing files (SYMEVO or a human), not by an in-page upload form. GitHub Pages has no backend to accept uploads.
- **Search indexing.** Search is client-side over `search.json`; it matches titles, summaries, and labels, not full post text.
