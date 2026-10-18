---
name: Hero device adjustments
description: Keep position changes separate from product-image scale in GrainDash hero refinements.
---

When the user asks to raise or lower the desktop hero's laptop and phone, preserve their chosen scale unless they ask for a size change.

**Why:** The user rejected a refinement that moved the devices too far upward and made them smaller. They had requested a position adjustment, not a size reduction.

**How to apply:** Treat elevation and scale as independent changes. Check shorter desktop viewports for text collisions rather than silently shrinking the product imagery.

Desktop layout must reserve separate space for product imagery and copy at shorter, narrower, and browser-zoomed sizes; the approved tall desktop composition alone is not sufficient.

**Why:** The independently positioned product layer collided with the headline in the user's actual desktop window, despite looking correct at the original design viewport.

**How to apply:** Keep the approved spacious composition where it fits, but use content-aware layout in constrained desktop windows and allow vertical scrolling rather than overlapping text. Verify short desktop windows as well as phones.
