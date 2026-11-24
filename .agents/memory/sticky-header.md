---
name: Sticky header checks
description: Avoid hidden scroll containers and obscured anchor destinations when adjusting the site's header.
---

A header that must stay in view needs document scrolling, and its actual height must be accounted for when jumping to a section.

**Why:** Hiding horizontal overflow on a header ancestor can create a scroll container and make a sticky header scroll away. A promotion can also make the header taller on phones, burying section headings after a navigation click.

**How to apply:** Clip horizontal artwork without making an ancestor a scroll container. After editing the header, check its position after scrolling and confirm in-page links land below it at both phone and desktop widths.
