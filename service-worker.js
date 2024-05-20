/* eslint-disable no-restricted-globals */
self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  // Add a call to skipWaiting here if you want to force the waiting service worker to become the active service worker immediately.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
  // Perform any other installation steps you need to do.
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  // Add fetch event handler logic here.
});
