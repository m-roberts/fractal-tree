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
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});