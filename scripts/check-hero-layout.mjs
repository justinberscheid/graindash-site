// Run against the running site with Node 20+:
// node --experimental-websocket scripts/check-hero-layout.mjs
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

const url = process.argv[2] || `https://${process.env.REPLIT_DEV_DOMAIN}/`;
const profile = await mkdtemp(join(tmpdir(), "graindash-layout-"));
const browser = spawn("chromium", [
  "--headless", "--no-sandbox", "--disable-gpu",
  "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });
let socket;
try {
  const endpoint = await new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(() => reject(new Error("Chromium startup timed out")), 20000);
    browser.stderr.on("data", chunk => {
      output += chunk.toString();
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timeout); resolve(match[1]); }
    });
    browser.once("error", reject);
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id) return;
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    clearTimeout(entry.timeout);
    if (message.error) entry.reject(new Error(JSON.stringify(message.error)));
    else entry.resolve(message.result);
  });
  function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const request = ++id;
      const timeout = setTimeout(() => {
        pending.delete(request);
        reject(new Error(`Timed out: ${method}`));
      }, 20000);
      pending.set(request, { resolve, reject, timeout });
      socket.send(JSON.stringify({ id: request, method, params, sessionId }));
    });
  }
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const page = (method, params) => send(method, params, sessionId);
  await page("Page.enable");
  await page("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  const sizes = [
    [1920, 840], [1536, 672], [1440, 960], [1440, 800], [1366, 768],
    [1280, 720], [1280, 560], [1100, 900], [1024, 768], [1024, 448],
    [901, 700], [768, 1024], [540, 800], [390, 874], [320, 680],
  ];
  for (const [width, height] of sizes) {
    await page("Emulation.setDeviceMetricsOverride", {
      width, height, deviceScaleFactor: 1, mobile: false,
    });
    await page("Page.navigate", { url });
    const result = await page("Runtime.evaluate", {
      awaitPromise: true, returnByValue: true,
      expression: `(async () => {
        while (document.readyState !== 'complete') await new Promise(r => setTimeout(r, 25));
        await document.fonts.ready;
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const rect = el => { const r=el.getBoundingClientRect(); return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}; };
        const shown = el => el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0;
        const overlaps = (a,b) => a.left < b.right-1 && a.right > b.left+1 && a.top < b.bottom-1 && a.bottom > b.top+1;
        const copy = [...document.querySelectorAll('.gd-farm h1 .nw,.gd-farm .chip,.gd-farm .hero-cta .btn')];
        const group = document.querySelector('.gd-farm-devices');
        const products = shown(group) ? [...group.querySelectorAll('img')] : [];
        return {
          collisions: products.flatMap(p => copy.filter(c => overlaps(rect(p),rect(c))).map(c => c.textContent.trim())),
          featureCount: document.querySelectorAll('.gd-farm .chip').length,
          overflow: copy.some(c => rect(c).right > innerWidth+1 || rect(c).left < -1),
          mobileDevicesHidden: !shown(group),
          title: [...document.querySelectorAll('.gd-farm h1 .nw')].map(rect),
          links: [...document.querySelectorAll('.gd-farm .hero-cta a')].map(a => a.href),
          brokenImages: [...document.querySelectorAll('.gd-farm img')].filter(i => !i.complete || i.naturalWidth===0).length,
          headerPresent: !!document.querySelector('header nav')
        };
      })()`,
    });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    const metrics = result.result.value;
    assert.deepEqual(metrics.collisions, [], `${width}x${height}: product/copy overlap`);
    assert.equal(metrics.overflow, false, `${width}x${height}: copy overflow`);
    assert.equal(metrics.featureCount, 8);
    assert.equal(metrics.brokenImages, 0);
    assert.equal(metrics.headerPresent, true);
    assert.deepEqual(metrics.links, [
      "https://graindashapp.net/", "https://apps.apple.com/us/app/graindash/id6798817387",
    ]);
    if (width <= 540) {
      assert.equal(metrics.mobileDevicesHidden, true);
      assert.ok(metrics.title[1].top >= metrics.title[0].bottom - 1);
    }
    console.log(`PASS ${width}x${height}: no overlap, no overflow, content and links intact`);
  }
} finally {
  socket?.close();
  browser.kill("SIGTERM");
  await new Promise(resolve => {
    if (browser.exitCode !== null) return resolve();
    browser.once("exit", resolve);
  });
  await rm(profile, { recursive: true, force: true });
}
