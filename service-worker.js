importScripts('workbox/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/fonts/materialicons.woff2', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/service-worker.js', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/ms-touch-icon-144x144-precomposed.png', revision: '1' },
    { url: '/apple-icon-152x152.png', revision: '1' },
    { url: '/apple-icon-192x192.png', revision: '1' },
    { url: '/icon-512x512.png', revision: '1' },
    { url: '/favicon.png', revision: '1'}
]);

workbox.routing.registerRoute(
  new RegExp('/img/'),
  workbox.strategies.staleWhileRevalidate({
        cacheName: 'images',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 60, // 60 hari
            maxEntries: 60,
          }),
        ],
    })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 60, // 60 hari untuk pages
            maxEntries: 60,
          }),
        ],
    })
);

workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
        cacheName: 'javascript'
    })
);

workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.staleWhileRevalidate({
        cacheName: 'css'
    })
);

// Menyimpan cache dari Api Football
workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-pwa-v1',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.cacheFirst({
    cacheName: 'api-pwa-v1',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 60, // 60 hari untuk Api Football
        maxEntries: 60,
      }),
    ],
  })
);

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// PUSH SUBSCRIPTION
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});



