// MyNeST service worker — full offline support.
// Bump CACHE whenever any file changes so phones pick up the new version.
const CACHE = 'mynest-v23';

const ASSETS = [
  './',
  './index.html',
  './algorithm.html',
  './drug-calc.html',
  './ett-calc.html',
  './spo2.html',
  './checklist.html',
  './simulation.html',
  './record.html',
  './monitor.html',
  './monitor-control.html',
  './skills-videos.html',
  './manifest.json',
  './ios.css',
  './pwa.js',
  './vendor/peerjs.min.js',
  './icons/apple-touch-icon.png',
  './icons/apple-touch-icon-167.png',
  './icons/apple-touch-icon-152.png',
  './icons/apple-touch-icon-120.png',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // cache:'reload' bypasses the HTTP cache so a fresh copy is stored
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // YouTube thumbnails: keep a copy once seen, so the video list looks right offline.
  if (url.hostname === 'img.youtube.com') {
    e.respondWith(
      caches.open(CACHE).then(c => c.match(req).then(hit => hit ||
        fetch(req).then(res => { c.put(req, res.clone()); return res; })))
    );
    return;
  }

  // Everything else cross-origin (YouTube player, PeerJS signalling) needs the network.
  if (url.origin !== self.location.origin) return;

  // Same-origin: serve from cache instantly, refresh the cache in the background
  // (stale-while-revalidate). New content shows on the next launch.
  e.respondWith(
    caches.open(CACHE).then(async c => {
      const cached = await c.match(req, { ignoreSearch: true });
      const network = fetch(req).then(res => {
        if (res && res.ok) c.put(req, res.clone());
        return res;
      }).catch(() => null);

      if (cached) { e.waitUntil(network); return cached; }
      const res = await network;
      if (res) return res;
      // Offline and not cached: open the home screen rather than an error page.
      if (req.mode === 'navigate') return (await c.match('./index.html')) || Response.error();
      return Response.error();
    })
  );
});
