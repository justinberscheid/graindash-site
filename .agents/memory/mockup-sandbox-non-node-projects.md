---
name: Mockup sandbox in non-Node projects
description: Why createArtifact(mockup-sandbox) fails with BOOTSTRAP_FAILED in Python/static projects and the recovery order.
---

**Rule:** In a project without a Node.js runtime (e.g. this static-HTML/Python repl), `createArtifact({artifactType:"mockup-sandbox"})` fails with `BOOTSTRAP_FAILED — error spawning pty for node ...bootstrap.js` ("No such file or directory" = `node` binary missing, not the script).

**Why:** The artifact bootstrap runs `node`, and the sandbox dev server needs vite. Neither exists until a Node module is installed. Even after a successful createArtifact retry, `node_modules` may be empty → workflow fails with `sh: vite: not found`.

**How to apply:** Recovery order: (1) install Node via package-management (`installProgrammingLanguage nodejs-20`), (2) retry `createArtifact`, (3) `npm install` inside `artifacts/mockup-sandbox/`, (4) restart the sandbox workflow. Also: package installs reboot ALL workflows — restart the main app workflow afterwards too. The sandbox's local port (from createArtifact `ports`) is what the Screenshot tool needs; canvas iframes use `https://$REPLIT_DOMAINS/__mockup/...` instead.
