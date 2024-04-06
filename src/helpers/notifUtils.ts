function checkNotifSupport (): boolean {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  try {
    // eslint-disable-next-line no-new
    new Notification('')
    // this is intended to be "thrown out" anyway
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'TypeError') return false
  }
  return true
}

export default function notifSupportInitializer (): string {
  if (!('Notification' in window) || !checkNotifSupport()) return 'unsupported'
  if (Notification.permission === 'denied') return 'blocked'
  if (Notification.permission === 'granted') return 'allowed'
  return 'pending'
}
