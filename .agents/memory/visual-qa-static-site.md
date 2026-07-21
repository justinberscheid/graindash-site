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

## Transparent device renders: faint alpha veil → square corners
The user's device-mockup PNGs carry a near-invisible alpha veil (alpha ~1-10) across the whole canvas, plus wide baked glow. A plain crop cuts mid-veil and shows a rectangle edge on dark bgs.
**Fix (rebuild from original attachment):** silhouette mask — `-alpha extract` → `-threshold 50% -morphology Dilate Disk:5 -blur 0x2.5` → Multiply into alpha → CopyOpacity → `-channel A -level 3%,100%` → `-trim`. Keeps device + natural AA edge, zeroes everything else; CSS drop-shadow replaces baked shadow.
**Verify:** corner pixel alpha = 0, plus zoomed scratch page on site-dark AND lighter gray bg (veil invisible on one bg can show on another).
