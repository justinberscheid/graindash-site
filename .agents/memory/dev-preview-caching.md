---
name: Dev preview caching gotcha
description: Why the user's preview pane can show stale content on this static site and how it was fixed
---

# Preview pane staleness on this static site

**Rule:** Never serve this site with bare `python3 -m http.server` — the preview must be served by `server.py`, which adds `Cache-Control: no-store`.

**Why:** Bare http.server sends `Last-Modified` but no `Cache-Control`, so browsers heuristic-cache the page (~10% of file age). The user's preview pane kept showing a weeks-old copy of index.html even though the server and my screenshots (fresh fetches) had the new version — user experienced "my preview never updates" while live GitHub Pages (different URL, sane cache headers) updated fine. Cost a frustrating exchange on 2026-07-17.

**How to apply:** Keep the `Static Server` workflow pointed at `python3 server.py`. If the user ever reports the preview not matching recent edits, suspect client-side caching first — verify with `curl -sI` what headers are actually sent, and remember screenshot-tool fetches bypass the user's cache, so "it looks right to me" proves nothing about their pane.
