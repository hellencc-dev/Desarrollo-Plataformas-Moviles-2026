
const CACHE_NAME = "react-pwa-v2";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon192.png",
  "/icons/icon512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const dest = req.destination; 

  if (dest === "document") {
    event.respondWith(
      fetch(req)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return response;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  if (dest === "script" || dest === "style") {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;

        return fetch(req).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return response;
        });
      })
    );
    return;
  }

  if (dest === "image") {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return response;
        });

        return cached || fetchPromise;
      })
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        return response;
      })
      .catch(() => caches.match(req))
  );
});