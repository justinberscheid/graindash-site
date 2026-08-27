---
name: GitHub push authentication
description: The static site's GitHub remote may reject both CLI and callback pushes when the workspace has no active GitHub authorization.
---

The local repository can be committed successfully even when the GitHub remote is not authenticated; confirm the remote branch after every push attempt rather than assuming a successful local commit is live.

**Why:** The remote rejected the workspace credential during a production-site update, leaving the local branch ahead of origin.

**How to apply:** Check `git rev-parse origin/main` against the local HEAD after pushing. If authentication is unavailable, use the Replit Version Control UI from the web workspace instead of asking for credentials in chat.