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

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open('fractal-tree')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});