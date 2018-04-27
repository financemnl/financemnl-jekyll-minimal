---
layout: null
---

var urlsToCache = [
  // Cache posts
  {% for post in site.posts %}
    urlsToCache.push("{{ post.url }}")
  {% endfor %}

  // Cache pages
  {% for page in site.html_pages %}
    urlsToCache.push("{{ page.url }}")
  {% endfor %}

  "/assets/css/main.css",
  "/assets/js/main.min.css",
  "/assets/css/critical.css",
  "/assets/js/loadCSS.js",
  "/about/",
  "/index.html"
];
// Cache name: adjust version number to invalidate service worker cachce.
var CACHE_NAME = 'james-ives-cache-v2';

// Cache assets
{% for asset in site.asset %}
    {% if asset.path contains '://res.cloudinary.com' or asset.extname == '.css' or asset.extname == '.js' %}
    urlsToCache.push("{{ file.path }}")
    {% endif %}
{% endfor %}



self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    cache.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(function() {
        // If it can't fetch the asset, display the offline only page
        return caches.match('/offline')
      })
    );
  });