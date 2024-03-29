'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "6520479fa91634de3897b955cfd02910",
"index.html": "c5dc9c8cb20c87322befa1389fce2227",
"/": "c5dc9c8cb20c87322befa1389fce2227",
"main.dart.js": "29467254eec17b296e67ead60c0e40c1",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "17e3ed117290eae6d63fce69d926e64e",
"icons/Icon-192.png": "55b6aee8b207d1bc861673899292756f",
"icons/Icon-maskable-192.png": "a81195294fc7bb0ad7cb125f086a4886",
"icons/Icon-maskable-512.png": "d89d946170909a8d43bd2a68a33aba4d",
"icons/Icon-512.png": "68b2f26da9de50f568dd44d417e89379",
"manifest.json": "dd1c93b98db442c13293beafdfb6ccbb",
"assets/images/PROFESIONAL.png": "040eaf9689cd5ae116ec0151b45457d9",
"assets/images/LINEASDECORACION.png": "9220282132ee29ad902769dc33e3efb6",
"assets/images/DISE%25C3%2591O.png": "185ef81ddeb6e89c2cde7e4d9bc365e1",
"assets/images/Visibilidad.png": "9a6c5792ff5ee8ce759712d39d69fe17",
"assets/images/Profesionalidad.png": "83cff45d370d31d2909bc9e3f7890642",
"assets/images/PLUMA.png": "b30a16b1d3a5859e9f38031e2abe478b",
"assets/images/FOCO.png": "e5783922c5561de4ca143d72476358df",
"assets/images/MYGIF.gif": "6be78a26f6281eab212c8a4f7c0beb5d",
"assets/images/USER.png": "98183b927b59a243c374a389e0f1cda3",
"assets/images/CORPORATIVO.png": "61c835b1a8e57365ca2c81bf7d7ae668",
"assets/images/LOGO%2520MEXAWEB%2520-%2520blanco.png": "3580673e6d88a281d503cd932f76c76d",
"assets/images/LOGO.png": "3467aee7dffcd05b726aed58b1601b8d",
"assets/images/MUNDO.png": "33126b3e71297f0a11ac11d9ce05f93c",
"assets/images/DECORACIONM.png": "cd570962cfb1399ece1983b5167d499d",
"assets/images/WEB.png": "f5e8dc64d0c954b588f0d595f443f83f",
"assets/images/LOGO%2520MEXAWEB%2520-%2520SIN%2520FONDO.png": "811d1658eb0f5f51bd6d283455ddfb3a",
"assets/images/LOGO%2520MEXAWEB.png": "21b03e52306a4311e00790e165152570",
"assets/images/IPAD.png": "54603164642cd3f3a40dfee77b8865c7",
"assets/images/Comunicaci%25C3%25B3n.png": "2dc59a857d286825f38875c6e7d3b52d",
"assets/images/TARGET.gif": "af23f61c0867feadd8159837e3d41a10",
"assets/images/LIBRO.png": "4687ae95daefb881471421302eec9d30",
"assets/images/Credibilidad.png": "a47e7d1804a4b1655b69e4827650b33b",
"assets/AssetManifest.json": "5f983f44a10340fe69ff244a1ca7147e",
"assets/NOTICES": "3c7d555af539efc0517006787a88045c",
"assets/FontManifest.json": "dc7f10f8d0b54f273ec20c1636125f26",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "d31f8e8738e97f795f7ba91410a8faf7",
"assets/fonts/Quicksand/static/Quicksand-Medium.ttf": "fd7f304a26dd790aef9f1ae84403eab3",
"assets/fonts/Quicksand/static/Quicksand-Light.ttf": "e60d43df6abf50de0980883f4596e268",
"assets/fonts/MaterialIcons-Regular.otf": "e241634f9dd4b842cecfa98480c3f9eb",
"assets/fonts/Raleway-2/static/Raleway-Medium.ttf": "0c8c5471e4a8bfe0f6167f56bcf1e2d3",
"assets/fonts/Poppins/Poppins-ExtraLight.ttf": "6f8391bbdaeaa540388796c858dfd8ca",
"assets/fonts/Poppins/Poppins-Light.ttf": "fcc40ae9a542d001971e53eaed948410",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
