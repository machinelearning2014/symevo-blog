/* SYMEVO Journal — theme, lightbox, and client-side search. No dependencies. */
(() => {
  const root = document.documentElement;
  const storageKey = "syme-blog-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const preferred = () => (media.matches ? "dark" : "light");
  const readStored = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : undefined;
    } catch {
      return undefined;
    }
  };
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (theme === "auto") {
      try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    } else {
      try { localStorage.setItem(storageKey, theme); } catch { /* ignore */ }
    }
    const button = document.querySelector(".theme-toggle");
    if (button) {
      button.setAttribute(
        "aria-label",
        `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      );
    }
  };
  applyTheme(readStored() ?? "auto");
  media.addEventListener("change", () => {
    if (root.dataset.theme === "auto") applyTheme("auto");
  });
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const current = root.dataset.theme === "auto" ? preferred() : root.dataset.theme;
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // Mobile navigation.
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  navToggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Copy-link buttons.
  document.addEventListener("click", async (event) => {
    const button = event.target.closest(".copy-link");
    if (!button) return;
    const url = button.dataset.url || location.href;
    try {
      await navigator.clipboard.writeText(url);
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => { button.textContent = original; }, 1400);
    } catch {
      button.textContent = "Copy failed";
      setTimeout(() => { button.textContent = "Copy link"; }, 1400);
    }
  });

  // Lightbox for post images, galleries, and heroes.
  const dialog = document.getElementById("lightbox");
  if (dialog instanceof HTMLDialogElement) {
    const image = dialog.querySelector("img");
    const caption = dialog.querySelector("figcaption");
    const close = dialog.querySelector(".lightbox-close");
    const open = (source) => {
      if (!image || !caption) return;
      image.src = source.currentSrc || source.src;
      image.alt = source.alt || "Image";
      const figure = source.closest("figure");
      caption.textContent = figure?.querySelector("figcaption")?.textContent?.trim() || source.alt || "";
      caption.hidden = !caption.textContent;
      dialog.showModal();
    };
    document.querySelector("main")?.addEventListener("click", (event) => {
      const source = event.target.closest("img");
      if (!(source instanceof HTMLImageElement)) return;
      if (source.closest(".card-cover, .profile-card, .search-result, .label-card")) return;
      event.preventDefault();
      open(source);
    });
    close?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      if (image) image.removeAttribute("src");
    });
  }

  // Client-side search.
  if (document.body.dataset.page === "search") {
    const form = document.querySelector(".search-form");
    const input = document.getElementById("q");
    const status = document.querySelector(".search-status");
    const results = document.querySelector(".search-results");
    const indexUrl = document.body.dataset.searchIndex;
    let posts;

    const load = async () => {
      if (!posts) {
        const response = await fetch(indexUrl);
        if (!response.ok) throw new Error(`Search index unavailable (${response.status})`);
        posts = await response.json();
      }
      return posts;
    };

    const render = async () => {
      if (!(input instanceof HTMLInputElement) || !results || !status) return;
      const query = input.value.trim().toLowerCase();
      results.replaceChildren();
      if (!query) {
        status.textContent = "Type to search titles, summaries, and labels.";
        return;
      }
      try {
        const all = await load();
        const matches = all.filter((post) =>
          [post.title, post.summary, ...(post.labels || [])]
            .join(" ")
            .toLowerCase()
            .includes(query)
        );
        status.textContent = `${matches.length} ${matches.length === 1 ? "result" : "results"} for “${input.value.trim()}”`;
        for (const post of matches) {
          const article = document.createElement("article");
          article.className = "search-result";
          if (post.cover) {
            const img = document.createElement("img");
            img.src = post.cover;
            img.alt = "";
            img.loading = "lazy";
            article.append(img);
          }
          const body = document.createElement("div");
          const title = document.createElement("h3");
          const link = document.createElement("a");
          link.href = post.url;
          link.textContent = post.title;
          title.append(link);
          const summary = document.createElement("p");
          summary.textContent = post.summary || "";
          const labels = document.createElement("div");
          labels.className = "chips";
          for (const label of post.labels || []) {
            const chip = document.createElement("span");
            chip.className = "chip";
            chip.textContent = label;
            labels.append(chip);
          }
          body.append(title, summary, labels);
          article.append(body);
          results.append(article);
        }
        if (!matches.length) {
          const empty = document.createElement("p");
          empty.className = "empty-state";
          empty.textContent = "No posts matched that search.";
          results.append(empty);
        }
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : String(error);
      }
    };

    let timer;
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input instanceof HTMLInputElement ? input.value.trim() : "";
      history.replaceState(null, "", query ? `?q=${encodeURIComponent(query)}` : location.pathname);
      void render();
    });
    input?.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => void render(), 160);
    });
    const initial = new URLSearchParams(location.search).get("q") || "";
    if (input instanceof HTMLInputElement) {
      input.value = initial;
      if (initial) void render();
    }
  }
})();
