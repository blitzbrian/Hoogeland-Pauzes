const assets = ['/', 'index.html', 'logo.png', 'global.css', 'build/bundle.css', 'build/bundle.js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css']

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open('site').then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', function(event) {
  if(event.request.method != 'GET') return;
  event.respondWith(
      caches.open('site').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          }).catch(() => {
              return response;
          });
        });
      })
    );
  });
