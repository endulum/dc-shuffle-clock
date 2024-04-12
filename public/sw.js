self.addEventListener('notificationclick', (event) => {
  if (event.notification.data.canJump) {
    clients.openWindow(event.notification.data.url)
  }
})

self.addEventListener('message', (event) => {
  // do nothing... it just needs to be woken up
})
