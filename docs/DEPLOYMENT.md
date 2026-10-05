# Deployment

`npm run build` produces `dist/`, a folder of static files. Any static host can serve it. This guide covers what the host must do, then the setups we use and test.

## What the host must do

1. **Serve `dist/` as the site root.**
2. **Return `404.html` with a `404` status for unknown paths.** Do not rewrite unknown paths to `index.html` (that turns every typo into a "soft 404" that search engines index). Most static hosts serve `404.html` automatically when it exists.
3. **Cache `/assets/*` for a long time** (`Cache-Control: public, max-age=31536000, immutable`). File names contain a content hash.
4. **Always revalidate `/sw.js`** (`Cache-Control: no-cache`), so service worker updates reach visitors.
5. **Serve over HTTPS.** Service workers only run on secure origins (and on `localhost`).
6. **Compress text responses** (gzip or Brotli). Static hosts and CDNs usually do.

Set the optional build-time variables (`VITE_CONTACT_BASE_URL`, `VITE_CHATBOT_BASE_URL`) in the host's environment so they are available during `npm run build`. They are inlined into the bundle, so changing them requires a new build.

## Render (static site)

This is how the production site is deployed.

1. Create a **Static Site** pointing at the repository.
2. **Build command:** `npm ci && npm run build`
3. **Publish directory:** `dist`
4. **Environment:** set `NODE_VERSION=22` and the `VITE_*` variables if you use them.
5. **Headers** (Settings → Headers): `/assets/*` → `Cache-Control: public, max-age=31536000, immutable` and `/sw.js` → `Cache-Control: no-cache`.
6. Do **not** add a catch-all rewrite to `/index.html`.

The repository contains a [render.yaml](../render.yaml) blueprint with the same settings. A blueprint only applies to services created from it; for an existing service, set the values in the dashboard.

### Gotchas we hit

- Leaving the build command empty and the publish directory at `.` publishes the **source** `index.html`. The page then requests `/src/main.tsx` and shows a black screen. Always set both.
- A CDN in front of the host (for example Cloudflare) may cache a `404` for a URL for hours. If you request a file before it is deployed, purge that URL afterwards.
- After a deploy, the CDN can serve the previous HTML for a few minutes (`s-maxage`).

## Docker

```bash
docker compose up --build        # http://localhost:8080
```

The `Dockerfile` has two stages: a Node stage that runs `npm ci` and `npm run build`, and an nginx stage that serves `dist/`. `nginx.conf` mirrors the production behavior (real 404 with the themed page, immutable cache for assets, no cache for `sw.js`, gzip).

Pass the optional variables as build arguments:

```bash
docker build \
  --build-arg VITE_CONTACT_BASE_URL=https://api.example.com/contact \
  --build-arg VITE_CHATBOT_BASE_URL=https://api.example.com/chatbot \
  -t esc-site .
docker run --rm -p 8080:80 esc-site
```

> The Docker setup is provided as a reference. It was written to match the nginx behavior described above but has not been exercised in CI.

## Other hosts

| Host             | Settings                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Netlify          | Build `npm run build`, publish `dist`. Netlify serves `404.html` for unknown paths automatically. Add the cache headers in `netlify.toml` or `_headers`. |
| Cloudflare Pages | Build `npm run build`, output `dist`. `404.html` is used automatically (do not enable the single-page-app fallback).                                     |
| Vercel           | Framework "Other", build `npm run build`, output `dist`. Add the cache headers in `vercel.json`.                                                         |
| S3 + CloudFront  | Upload `dist/`. Set the error document to `404.html` and make sure its response code stays `404`. Set the cache headers as object metadata.              |
| Your own nginx   | Reuse `nginx.conf`.                                                                                                                                      |

## Verifying a deployment

```bash
curl -I https://your-domain/                       # 200, text/html
curl -I https://your-domain/does-not-exist         # 404 (not 200)
curl -I https://your-domain/assets/<hashed-file>   # Cache-Control: ... immutable
curl -s https://your-domain/ | grep -c 'type="module"'   # 1, the hydration script
```

Then open the site, turn the network off in the browser's developer tools and reload: the offline page should appear.
