function checkNotifSupport (): boolean {
  // 1. does this device support service workers?
  if ('serviceWorker' in navigator) return true
  // 2. if not, does this device support the Notification object?
  if (!('Notification' in window)) return false
  // 3. and if so, can this device actually invoke a Notification object?
  try {
    const notif = new Notification('')
    notif.close()
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'TypeError') return false
  }
  return true
}

export default function notifSupportInitializer (): string {
  if (!checkNotifSupport()) return 'unsupported'
  if (Notification.permission === 'denied') return 'blocked'
  if (Notification.permission === 'granted') return 'allowed'
  return 'pending'
}
