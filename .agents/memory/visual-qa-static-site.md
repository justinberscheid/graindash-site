---
name: Visual QA techniques for this static site
description: How to verify visual changes on the single-file marketing site given screenshot-tool limits
---

# Visual QA on the GrainDash static site

**Rule:** The screenshot tool uses a fixed 1280×720 desktop viewport and can't scroll to mid-page anchors reliably.

**Why:** The site sets `scroll-behavior:smooth`, so hash-anchor screenshots fire before the scroll completes (hero shows instead of the target section). Toggling it to `auto` still proved unreliable. There is no viewport-size option for app previews.

**How to apply:**
- Mid-page section check: temporarily copy/move that section's markup into a scratch page (or to the top of a copy like `index-test.html`), screenshot it, then delete the scratch file.
- Responsive breakpoints check: make a scratch page with fixed-width `<iframe src="/">` elements (e.g. 400px and 760px side by side) — media queries respond to iframe width. Screenshot once, then delete.
- Erasing baked-in UI (buttons/text) from reference images: ffmpeg `delogo=x:y:w:h` interpolates the region from surroundings; works well on dark gradient backgrounds, then `crop`.
