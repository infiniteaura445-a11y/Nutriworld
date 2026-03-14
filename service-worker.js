// ═══════════════════════════════════════════════
// service-worker.js  –  AyurLife Naturals PWA
// Caching strategy: Cache-first for assets,
//                   Network-first for API/data
// ═══════════════════════════════════════════════

const CACHE_NAME    = "ayurlife-v1.0.0";
const OFFLINE_URL   = "/offline.html";

// Assets to cache immediately on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/firebase.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
];

// ── Install ──
self.addEventListener("install", event => {
  console.log("[SW] Installing AyurLife Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith("https://fonts") && !url.startsWith("https://cdnjs")));
    }).then(() => self.skipWaiting())
  );
});

// ── Activate ──
self.addEventListener("activate", event => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log("[SW] Deleting old cache:", key);
          return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ──
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and non-http(s)
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;

  // Firebase Firestore – Network first, cache fallback
  if (url.hostname.includes("firestore.googleapis.com") || url.hostname.includes("firebase")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Google Fonts & CDN assets – Cache first
  if (url.hostname.includes("fonts.googleapis.com") ||
      url.hostname.includes("fonts.gstatic.com") ||
      url.hostname.includes("cdnjs.cloudflare.com") ||
      url.hostname.includes("cdn.tailwindcss.com")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // App shell & local assets – Cache first
  event.respondWith(cacheFirst(request));
});

// ── Strategies ──

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type !== "opaque") {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return offline page for navigation requests
    if (request.destination === "document") {
      return caches.match(OFFLINE_URL) || new Response("<h1>You are offline</h1>", {
        headers: { "Content-Type": "text/html" }
      });
    }
    return new Response("", { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response(JSON.stringify({ error: "Offline" }), {
      headers: { "Content-Type": "application/json" },
      status: 503
    });
  }
}

// ── Push Notifications (future use) ──
self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "AyurLife Naturals", {
      body: data.body || "New products & offers available!",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-72.png",
      tag: "ayurlife-notification",
      data: { url: data.url || "/" }
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || "/")
  );
});
