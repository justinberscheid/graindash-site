#!/usr/bin/env python3
"""Dev preview server for the GrainDash site.

Identical to `python3 -m http.server 5000` except it sends no-cache headers,
so the Replit preview pane always shows the latest saved files instead of a
stale browser-cached copy. The real site is served by GitHub Pages; this file
is only used for local preview and is never part of the published site's pages.
"""
import http.server


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    http.server.ThreadingHTTPServer(("0.0.0.0", 5000), NoCacheHandler).serve_forever()
