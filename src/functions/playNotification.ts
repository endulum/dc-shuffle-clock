import { addToEventLog } from './addToEventLog.ts'
import { type IClockSettings } from '../types.ts'

export default function playNotification (
  settings: IClockSettings,
  type: null | 'sworker' | 'browser',
  alertString: string
): void {
  try {
    if (type === 'sworker') notifyWithSWorker(settings, alertString)
    if (type === 'browser') notifyWithBrowser(settings, alertString)
  } catch (err) { addToEventLog(err) }
}

function notifyWithBrowser (
  settings: IClockSettings,
  alertString: string
): void {
  const notif = new Notification(
    'Incoming Cave Shuffle',
    { body: alertString }
  )
  if (settings.biomeEnabled) {
    notif.addEventListener('click', (e) => {
      e.preventDefault()
      const url = `https://dragcave.net/locations/${settings.biomeSelect}`
      if (settings.biomeOpenType === 'tab') window.open(url, '_blank')
      if (settings.biomeOpenType === 'window') window.open(url, '', 'width=900,height=500')
    })
  }
  if (settings.notifAutoDismiss) {
    setTimeout(() => { notif.close() }, settings.delay * 1000)
  }
}

function notifyWithSWorker (
  settings: IClockSettings,
  alertString: string
): void {
  navigator.serviceWorker.ready.then(async (serviceWorker) => {
    await serviceWorker.showNotification(
      'Incoming Cave Shuffle',
      {
        body: alertString,
        data: {
          canJump: settings.biomeEnabled,
          url: `https://dragcave.net/locations/${settings.biomeSelect}`
        }
      }
    )
    const notif = (await serviceWorker.getNotifications())[0]
    if (settings.notifAutoDismiss) {
      setTimeout(() => { notif.close() }, settings.delay * 1000)
    }
  }).catch((err) => { addToEventLog(err) })
}
