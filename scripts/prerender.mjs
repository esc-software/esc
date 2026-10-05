/**
 * Static prerender: turns the client build (dist/index.html) into a fully
 * rendered page, so crawlers and users get content and SEO tags immediately,
 * without waiting for JavaScript.
 *
 * Run after `vite build` and `vite build --ssr` (see the "build" npm script).
 */
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distFile = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { renderPage, renderNotFound } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);
const template = await readFile(distFile, "utf-8");

for (const marker of ["<!--seo-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`Marker ${marker} not found in dist/index.html`);
}

// Preload the fonts used above the fold (hashed file names come from the Vite build).
const assets = await readdir(path.join(root, "dist", "assets"));
const preloads = ["montserrat-latin-wght-normal", "google-sans-code-latin-full-normal"].map(
  (name) => {
    const file = assets.find((f) => f.startsWith(name) && f.endsWith(".woff2"));
    if (!file) throw new Error(`Font file ${name} not found in dist/assets`);
    return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
  },
);

// Inline the (small) stylesheet: removes a render-blocking request from the critical path.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!cssLink) throw new Error("Stylesheet link not found in dist/index.html");
const css = await readFile(path.join(root, "dist", cssLink[1]), "utf-8");

const robots = /<meta\s+name="robots"[^>]*>/;

const inject = (tpl, page) =>
  tpl
    .replace(cssLink[0], () => `<style>${css}</style>`)
    .replace(/<html lang="[^"]*">/, `<html lang="${page.htmlLang}">`)
    .replace("<!--seo-head-->", () => page.head)
    .replace("<!--app-html-->", () => page.html);

// Home page
const home = renderPage();
home.head = [...preloads, home.head].join("\n    ");
const homeHtml = inject(template, home);
await writeFile(distFile, homeHtml);
console.log(`prerendered dist/index.html (${(homeHtml.length / 1024).toFixed(1)} kB)`);

// 404 page: same look and not indexable. It keeps the app bundle, so the page hydrates
// and gets the custom cursor like the rest of the site. The host serves it for unknown URLs.
const missing = renderNotFound();
missing.head = [...preloads, missing.head].join("\n    ");
const notFoundTemplate = template.replace(
  robots,
  '<meta name="robots" content="noindex, nofollow" />',
);
const notFoundHtml = inject(notFoundTemplate, missing);
await writeFile(path.join(root, "dist", "404.html"), notFoundHtml);
console.log(`prerendered dist/404.html (${(notFoundHtml.length / 1024).toFixed(1)} kB)`);

await rm(ssrDir, { recursive: true, force: true });
