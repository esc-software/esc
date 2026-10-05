# Architecture

This document explains how the site is built and why. Read it before changing the build, the rendering or the head tags.

## Overview

The site is a React app that is **rendered to static HTML at build time** and then **hydrated** in the browser. There is no server at runtime: the build output is a folder of files.

```text
 src/ ──vite build──────────────▶ dist/            client bundle (JS, CSS, fonts) + template index.html
   │
   └──vite build --ssr──────────▶ dist-ssr/         server bundle (entry-server.tsx)
                                        │
 scripts/prerender.mjs ◀────────────────┘
   │  renders the React tree to a string, injects head tags, preloads fonts, inlines CSS
   ▼
 dist/index.html   (landing page)       dist/404.html   (not found, noindex)
```

`npm run build` runs the three steps in order. The server bundle is deleted at the end.

## Rendering model

### One component, two environments

`src/App.tsx` chooses the page from a path:

```tsx
HOME_PATHS.includes(pathname) ? <Index /> : <NotFound />;
```

- At build time, `src/entry-server.tsx` renders `<App pathname="/" />` for the home page and `<NotFound />` for the 404.
- In the browser, `src/main.tsx` calls `hydrateRoot(container, <App pathname={window.location.pathname} />)`.

The site has one page and a 404, so a path check is all the routing it needs. Because the host serves `404.html` for any unknown URL, the browser hydrates the page that matches the URL it received. If you add pages, add a router (or more entries to `HOME_PATHS`-style maps) and prerender each one; see the checklist in [CUSTOMIZATION.md](CUSTOMIZATION.md).

### The template

`index.html` is a template. The prerender script replaces two markers:

| Marker            | Replaced by                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `<!--seo-head-->` | Font preloads, `<title>`, meta tags, canonical URL and JSON-LD for the page |
| `<!--app-html-->` | The server-rendered markup inside `<div id="root">`                         |

During `npm run dev` the markers are plain comments and there is no prerendered markup, so the dev server mounts the app with `createRoot` instead of hydrating. SEO tags do not exist in dev; check them in a production build.

### Hydration rules

Hydration only works when the browser renders the same markup as the server. The code follows these rules, and the tests guard some of them:

- **Nothing browser-only renders on the server.** `CustomCursor` renders `null` until an effect runs after hydration, and only on devices with a fine pointer. The intro skip (`sessionStorage`) is also read in an effect, never during render.
- **Above-the-fold content is visible in the HTML.** The hero text uses `initial={false}` (and `immediate` on `ScrollReveal`) so the prerendered HTML contains the final state, not `opacity: 0`. This is what makes the Largest Contentful Paint fast. Below-the-fold sections still animate in on scroll.
- **Collapsed content stays in the DOM.** FAQ answers are always rendered and only collapsed with height and opacity, so crawlers and the `FAQPage` markup see the same text as visitors.

## Head tags and structured data

All SEO output comes from `src/seo/`:

- `copy.ts`: the text (title, descriptions, keywords, schema descriptions). One place to edit wording.
- `head.ts`: builds the `<head>` markup and the JSON-LD graph from `copy.ts`, `src/config/site.ts` and `src/content.ts`. Because the FAQ and the services are read from the same content the page renders, the markup cannot drift from what is visible.

See [SEO.md](SEO.md) for what is generated and why.

## Performance decisions

| Decision                                         | Why                                                                                                                                                                         |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prerendered HTML**                             | Content and metadata are available without JavaScript; first paint does not wait for the bundle.                                                                            |
| **Self-hosted variable fonts** (`src/fonts.css`) | No third-party request in the critical path. The two fonts used above the fold are preloaded by the prerender script (the hashed file names come from the build).           |
| **CSS inlined into the HTML**                    | Removes a render-blocking request. The stylesheet is small (about 6 KB gzipped).                                                                                            |
| **Hero visible at first paint**                  | LCP does not wait for hydration (see Hydration rules).                                                                                                                      |
| **Images**                                       | Client logos are served at three times their displayed size, with explicit `width` and `height` so they never shift the layout; below-the-fold images use `loading="lazy"`. |
| **Intro animation**                              | Short (about 2 s) and skipped on repeat visits in the same session, so it does not delay returning visitors.                                                                |
| **Immutable cache for `/assets/*`**              | File names contain a content hash, so they can be cached for a year.                                                                                                        |

### Analytics

`index.html` queues the Google Analytics events immediately and loads `gtag.js` only when the page is idle (or on the first interaction). It is still the most expensive script on the page: it costs several hundred milliseconds of main-thread time and makes Lighthouse scores vary by about 10 points on mobile. To remove analytics, delete the `gtag` block in `index.html`; no other code depends on it.

## Offline page and service worker

- `public/offline.html` is a **single self-contained file** (inline CSS and JS, inline logo, system fonts) because it must work with no network at all. It contains the snake game: a grid-based game loop with smooth interpolation between steps, keyboard and swipe controls, a best score kept in `localStorage`, and auto-reload when the browser fires `online`.
- `public/sw.js` pre-caches the offline page and a few icons on install and answers **only failed navigations** with it. Every other request goes straight to the network, so the service worker can never serve a stale site. When you change `offline.html`, bump `CACHE` in `sw.js` so returning visitors get the new version.
- `src/main.tsx` registers the service worker in production, after the `load` event.
- The offline page is `noindex` and is not in the sitemap.

## 404 page

`src/pages/NotFound.tsx` is prerendered into `dist/404.html`. The host serves it with a `404` status for unknown URLs. It keeps the app bundle so the page hydrates and the custom cursor works (the site hides the system cursor globally). The prerender script marks it `noindex` and it has no canonical URL.

## Backend contracts

The repository contains only the front end. Two optional backends are configured with environment variables:

**Contact form** (`VITE_CONTACT_BASE_URL`): `POST` with `Content-Type: application/json` and body

```json
{ "name": "Ada", "email": "ada@example.com", "message": "Hello" }
```

Any `2xx` response counts as success; anything else shows an error message.

**Chat widget** (`VITE_CHATBOT_BASE_URL`):

- `POST {base}/chat` with `{ "text": "…" }`. Response: `{ "response": "…", "blocked"?: boolean, "intent"?: string, "entities"?: [{ "type": string, "value": string }], "lang"?: string }`. If `blocked` is true the widget shows "Request not allowed."
- `POST {base}/clear` clears the conversation on the server.

## Tests

`npm test` runs Vitest with jsdom. Tests live next to the code (`*.test.ts(x)`), plus `src/test/public-files.test.ts` for the files in `public/`. They render components with `renderToString`, exactly as the prerender step does, so they check what crawlers receive. Keep new tests in the same style.

## Dependencies

Production dependencies are intentionally few: `react`, `react-dom`, `framer-motion` and `lucide-react`. Everything else is a build or test tool. Add a dependency only when it earns its place; every kilobyte of JavaScript costs Core Web Vitals.
