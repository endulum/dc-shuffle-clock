self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', async (event) => {
  event.notification.close();
  const { url, canJump } = event.notification.data;
  event.waitUntil(
    (async () => {
      const clientList = await clients.matchAll({ type: 'window' });
      for (const client of clientList) {
        if (client.url === self.registration.scope && 'focus' in client) {
          try {
            await client.focus();
            if (canJump) client.postMessage({ action: 'openBiome', url: url });
            return;
          } catch (e) {
            console.error(e);
            client.postMessage({
              type: 'error',
              error: e.message ?? 'See console for details',
            });
          }
        }
      }
    })()
  );
});

// there's an event listener in index.html with some code
// whose error may be valuable to know. but it is not in the react scope
// so it will post back to this worker, which will post back to
// the error component. weird workaround, but you can't spell
// workaround without work. get it, cause despite everything it "works"...
self.addEventListener('message', async (event) => {
  const { error } = event.data;
  event.waitUntil(
    (async () => {
      const clientList = await clients.matchAll({ type: 'window' });
      for (const client of clientList) {
        if (client.url === self.registration.scope && 'focus' in client) {
          client.postMessage({
            type: 'error',
            error: error ?? 'See console for details',
          });
        }
      }
    })()
  );
});
