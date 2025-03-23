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
          await client.focus();
          if (canJump) client.postMessage({ action: 'openBiome', url: url });
          return;
        }
      }
    })()
  );
});
