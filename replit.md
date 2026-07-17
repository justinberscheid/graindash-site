# GrainDash Marketing Site

## Overview
Static single-page marketing website for GrainDash (farm dashboard SaaS), served from `index.html` at the repo root. No build step, no framework — one HTML file with inline CSS/JS, plus images in `assets/`. Production hosting is GitHub Pages (graindash.net); the app itself lives at graindashapp.net (separate project).

## Running locally
The `Static Server` workflow serves the site on port 5000 via `python3 server.py` — a thin wrapper around `http.server` that adds `Cache-Control: no-store` headers. Do not swap it back to bare `python3 -m http.server`: without the no-cache headers, browsers heuristic-cache the page and the preview pane shows stale content after edits.

## Structure
- `index.html` — entire site (styles in a single `<style>` block, scripts inline at the bottom)
- `assets/` — images (`graindash-logo.png` full wordmark logo, `hero-field.jpg` hero background strip, app screenshots for the device showcase)
- `attached_assets/` — user-provided reference files, not shipped pages

## Design system
- Dark theme: `--bg:#0b0b0b`, cards `#141513`, border `#23271f`
- Brand greens: `--green:#28BD35`, `--green-hi:#3DE84C`
- Fonts: Plus Jakarta Sans (headings), Public Sans (body), loaded from Google Fonts
- Hero: centered logo + "The Whole Farm. One Dashboard." headline, six feature chips, two CTA buttons, wheat-field image strip anchored to the section bottom with a gradient fade (`.hero-field`)

## Conventions
- Nav logo and favicon are inline base64; larger images live in `assets/`
- Responsive breakpoints: 1000px, 760px, 480px media queries in the same style block

## User preferences
(none recorded yet)
