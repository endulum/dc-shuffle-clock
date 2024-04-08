self.addEventListener('notificationclick', (event) => {
  if (event.notification.data.canJump) {
    clients.openWindow(event.notification.data.url)
  }
})
