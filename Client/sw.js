var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  './',
  './assets/',
  './images/',
  './manifest.json',
  './main.js'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  console.log("App Installable");
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (event) {
  console.log("fetch");
});