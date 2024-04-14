export function checkNotificationSupport (): boolean {
  if (!('Notification' in window)) return false
  // if (Notification.permission === 'granted') return true
  try {
    const notif = new Notification('')
    setTimeout(() => { notif.close() }, 0)
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'TypeError') return false
  }
  return true
}

export function checkServiceWorkerSupport (): boolean {
  return 'serviceWorker' in navigator
}

export function notifSupportInitializer (): string {
  const notifSupport = checkNotificationSupport()
  const swSupport = checkServiceWorkerSupport()
  if (!notifSupport && !swSupport) return 'unsupported'
  if (Notification.permission === 'denied') return 'blocked'
  if (Notification.permission === 'granted') return 'allowed'
  return 'pending'
}
