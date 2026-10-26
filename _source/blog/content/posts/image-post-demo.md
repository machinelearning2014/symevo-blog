---
title: "Image post: four views of the same idea"
date: "2026-10-25T11:30:00Z"
summary: "A gallery post with a cover image, captions, and a click-to-zoom lightbox. The layout is deliberately closer to a photo blog than a documentation page."
labels: ["design", "gallery", "blog"]
cover_image: "assets/images/posts/image-post-demo/cover.svg"
cover_alt: "A wide abstract cover with layered teal and amber shapes."
gallery:
  - src: "assets/images/posts/image-post-demo/one.svg"
    alt: "Minimal geometric composition with a single amber circle."
    caption: "One idea, one center of gravity."
  - src: "assets/images/posts/image-post-demo/two.svg"
    alt: "Layered translucent rectangles in teal and sand."
    caption: "Evidence accumulates in layers, not in a single flash."
  - src: "assets/images/posts/image-post-demo/three.svg"
    alt: "A grid of small squares with one highlighted cell."
    caption: "The gate is local: one missing artifact blocks the claim."
draft: false
---

A blog needs to handle images as first-class content, not as an afterthought. This post demonstrates the two image paths the site supports: a cover image at the top of the post, and a gallery rendered below the prose with captions and a lightbox.

The cover is declared in the front matter. It appears on the home page card and again as the post hero. The gallery is also front matter, which keeps the Markdown body focused on writing instead of layout markup.

To add an inline image inside a paragraph, use normal Markdown:

![Inline example](assets/images/posts/image-post-demo/one.svg "An inline figure with a caption")

The renderer turns an image with a title into a `<figure>` with a `<figcaption>`, and every image on the page is lazy-loaded. Clicking any image opens the full-size version in a dialog; Escape or a click outside closes it.

That is the whole image-post feature: cover, inline figures, gallery, captions, alt text, and zoom.
