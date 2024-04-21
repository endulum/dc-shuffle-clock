self.addEventListener('notificationclick', (event) => {
  if (event.notification.data.canJump) {
    clients.openWindow(event.notification.data.url)
  }
})

self.addEventListener('message', (event) => {
  // i have no idea. i just want the page to wake
})
