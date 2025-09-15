const CACHE_NAME = "site-cache-v4";
const urlsToCache = [
  "Map.html",
  "Home.html",
  "Quiz.html",
  "CourseMap.html",
  "main.js",
  "Banner.png",
  "Disha.png",
  "About.html",
  "offline.html"
];

// Install SW and cache important files
self.addEventListener("install", event => {
  self.skipWaiting(); // activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate new SW and clear old cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    )
  );
  return self.clients.claim(); // take control of all pages immediately
});

// Fetch: network first for HTML, cache fallback for others
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate" || event.request.destination === "document") {
    // HTML pages → network first
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then(res => res || caches.match("offline.html"))
      )
    );
  } else {
    // Other assets → network with cache fallback
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
