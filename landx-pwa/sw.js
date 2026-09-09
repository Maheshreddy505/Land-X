const CACHE = 'landx-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL_FILES)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for the app shell itself; network-first (pass-through) for everything else
// (CDN libraries, OpenStreetMap tiles) so the map/charts still get fresh data when online.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isShellFile = url.origin === self.location.origin;

  if (isShellFile) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
  // else: let the browser handle it normally (don't intercept third-party requests)
});
