---
name: Canvas iframe routing & failed states
description: How mockup-sandbox preview URLs actually route in this project, and why canvas frames flip to "failed"
---

## Preview URL routing (this project: python static server on 5000 + sandbox vite on 23636)
- Canvas iframe URLs `https://<dev-domain>/__mockup/preview/...` (bare domain, no port) DO work: Replit's platform proxy path-routes `/__mockup/*` before it reaches the python server. `https://<dev-domain>:3000/...` (externalPort for 23636) also works.
- **Do not be fooled by static-server 404s**: internal requests to `127.0.0.1:5000/__mockup/...` 404 (python has no such route). Those log lines come from Screenshot-tool calls that defaulted to port 5000 — not from broken iframes.
- **Why:** wasted a debugging round assuming all frames were broken when curl showed bare-domain 200s.
- **How to apply:** verify preview URLs with `curl` against the real external URL, and point the Screenshot tool at the sandbox port directly (e.g. `port: 23636`, path `/__mockup/preview/<group>/<Name>`). Subagents verifying their own mockups must be told the port or they'll screenshot 5000 and 404.

## Frames flip to "failed" after restarts
- Restarting the sandbox workflow (or load attempts during the 404-rescan window) makes the canvas host mark iframes `state: "failed"` — including old rows from prior sessions. URLs are usually still fine.
- **How to apply:** after subagents finish + one workflow restart, batch `applyCanvasActions` updates setting every affected iframe back to `state: "live"` (old rows too), then verify one render before presenting.

## Misc platform limit hit in this workflow
- `waitForJob` timeout param max is 600 (seconds). For long design-subagent fanouts, wait 600 and re-wait in a follow-up call — jobs persist across CodeExecution calls.
