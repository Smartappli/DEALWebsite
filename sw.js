const CACHE_NAME = "dealiot-pwa-v16-reliable-revalidation";
const ASSET_VERSION = "20260711-community-v4";
const ROUTE_ASSETS = [
  "./",
  "./fr/",
  "./sv/",
  "./es/",
  "./sl/",
  "./sk/",
  "./ro/",
  "./pt/",
  "./pl/",
  "./mt/",
  "./lt/",
  "./lv/",
  "./it/",
  "./ga/",
  "./hu/",
  "./el/",
  "./de/",
  "./fi/",
  "./et/",
  "./nl/",
  "./da/",
  "./cs/",
  "./hr/",
  "./bg/",
];
const CORE_ASSETS = [
  "./offline.html",
  `./styles.css?v=${ASSET_VERSION}`,
  `./app.js?v=${ASSET_VERSION}`,
];
const OPTIONAL_ASSETS = [
  "./site.webmanifest",
  "./assets/mark.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/social-card.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);
      await Promise.all(
        [...ROUTE_ASSETS, ...OPTIONAL_ASSETS].map((asset) => cache.add(asset).catch(() => undefined)),
      );
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  const isNetworkFirstAsset =
    requestUrl.pathname.endsWith("/sw.js") ||
    requestUrl.pathname.endsWith("/site.webmanifest") ||
    requestUrl.pathname.endsWith("/robots.txt") ||
    requestUrl.pathname.endsWith("/sitemap.xml") ||
    requestUrl.pathname.endsWith("/llms.txt") ||
    requestUrl.pathname.endsWith("/humans.txt");

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "./offline.html"));
    return;
  }

  if (isNetworkFirstAsset) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, event));
});

function cacheResponse(request, response) {
  if (!response || !response.ok) {
    return Promise.resolve(response);
  }

  const responseCopy = response.clone();
  return caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, responseCopy))
    .catch(() => undefined)
    .then(() => response);
}

function networkFirst(request, fallbackUrl) {
  return fetch(request)
    .then((response) => cacheResponse(request, response))
    .catch(() =>
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }

        if (!fallbackUrl) {
          return Response.error();
        }

        return caches.match(fallbackUrl).then((fallback) => fallback || Response.error());
      }),
    );
}

function staleWhileRevalidate(request, event) {
  const networkResponse = fetch(request)
    .then((response) => cacheResponse(request, response))
    .catch(() => caches.match(request, { ignoreSearch: true }).then((cached) => cached || Response.error()));

  event.waitUntil(networkResponse.then(() => undefined));
  return caches.match(request).then((cached) => cached || networkResponse);
}
