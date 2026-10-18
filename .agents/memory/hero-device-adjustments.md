---
name: Hero device adjustments
description: Keep position changes separate from product-image scale in GrainDash hero refinements.
---

When the user asks to raise or lower the desktop hero's laptop and phone, preserve their chosen scale unless they ask for a size change.

**Why:** The user rejected a refinement that moved the devices too far upward and made them smaller. They had requested a position adjustment, not a size reduction.

**How to apply:** Treat elevation and scale as independent changes. Check shorter desktop viewports for text collisions rather than silently shrinking the product imagery.
