self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('fractal-tree').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/css/style.css',
       '/js/ftDrawService.js'
     ]);
   })
 );
});
