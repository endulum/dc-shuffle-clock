self.addEventListener('notificationclick', (event) => {
  if (event.notification.data.canJump) {
    clients.openWindow(event.notification.data.url)
  }
})

self.addEventListener('message', (event) => {
  localStorage.setItem('wake', JSON.stringify(true))
  // i have no idea. i just want the page to wake
})
