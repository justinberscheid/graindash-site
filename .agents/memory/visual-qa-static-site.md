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

## Retina resolution rule for device renders
Export device-render PNGs at ~2x their largest CSS display size, or they look soft/blurry on high-DPI screens even though they look fine in 1x screenshots. **Why:** the digest phone displayed ~290px wide from a 455px asset (580px retina needed) and the user saw it as "not polished" vs the hero showcase phone shown at 218px. **How to apply:** before processing a render, check its max CSS display width/height, double it, and resize from the full-res source (attached_assets originals are 1500×2700).

## Baked-in ground shadows in device renders
Original renders can include a semi-opaque ground shadow below the device; a threshold-50% silhouette mask keeps it, showing a "black blob" on the page. **How to apply:** raise the alpha threshold (~65%) and keep only the largest connected component (`-define connected-components:area-threshold=5000 -define connected-components:mean-color=true -connected-components 8`) before dilate/blur. Also: single blurred radial gradients look cheap/bandy for glows — layer 2-3 radial-gradients at decreasing alpha with no blur filter instead.
