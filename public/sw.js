/*
 * Offline fallback only. The service worker caches /offline.html and serves it when a page
 * navigation fails because there is no connection. Everything else goes straight to the
 * network, so the site is never served stale. Bump CACHE to ship a new offline page.
 */
const CACHE = "esc-offline-v3";
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL, "/favicon.ico", "/favicon-32.png", "/apple-touch-icon.png"];

async function precache() {
  const cache = await caches.open(CACHE);
  await Promise.all(
    PRECACHE.map(async (url) => {
      const response = await fetch(new Request(url, { cache: "reload" }));
      if (!response.ok) throw new Error(`Precache failed for ${url}: ${response.status}`);
      // A redirected response cannot answer a navigation, so store a clean copy.
      const clean = response.redirected
        ? new Response(await response.blob(), { status: 200, headers: response.headers })
        : response;
      await cache.put(url, clean);
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.mode !== "navigate") return;

  event.respondWith(
    fetch(request).catch(async () => {
      const cache = await caches.open(CACHE);
      return (await cache.match(OFFLINE_URL)) || Response.error();
    }),
  );
});
