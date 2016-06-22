self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('fractal-tree').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/css/images/ui-bg_flat_75_ffffff_40x100.png',
       '/css/images/ui-bg_glass_65_ffffff_1x400.png',
       '/css/images/ui-bg_glass_75_dadada_1x400.png',
       '/css/images/ui-bg_glass_75_e6e6e6_1x400.png',
       '/css/images/ui-bg_highlight-soft_75_cccccc_1x100.png',
       '/css/style.css',
       '/css/bootstrap.css',
       '/js/angularApp.js',
       '/js/angularApp.js',
       '/js/ftCanvas.js',
       '/js/ftDrawService.js'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});