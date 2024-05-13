import { addToEventLog } from './addToEventLog.ts'
import { type IClockSettings } from '../types.ts'

export default function playNotification (
  settings: IClockSettings,
  type: null | 'sworker' | 'browser',
  isHourly: boolean
): void {
  let notifText = ''
  if (isHourly) {
    notifText = `The hourly cave restock will occur in about ${
      settings.useCustomHourlyDelay
        ? settings.customHourlyDelay
        : settings.delay
    } seconds.`
  } else notifText = `The next cave shuffle will occur in ${settings.delay} seconds.`

  try {
    if (type === 'sworker') notifyWithSWorker(settings, isHourly, notifText)
    if (type === 'browser') notifyWithBrowser(settings, isHourly, notifText)
  } catch (err) { addToEventLog(err) }
}

function notifyWithBrowser (
  settings: IClockSettings,
  isHourly: boolean,
  notifText: string
): void {
  const notif = new Notification(
    isHourly ? 'Incoming Cave Restock' : 'Incoming Cave Shuffle',
    { body: notifText }
  )
  if (settings.biomeEnabled) {
    notif.addEventListener('click', (e) => {
      e.preventDefault()
      const url = `https://dragcave.net/locations/${settings.biomeSelect}`
      if (settings.biomeOpenType === 'tab') window.open(url, '_blank')
      if (settings.biomeOpenType === 'window') window.open(url, '', 'width=900,height=500')
    })
  }
  setTimeout(() => { notif.close() }, settings.delay * 1000)
}

function notifyWithSWorker (
  settings: IClockSettings,
  isHourly: boolean,
  notifText: string
): void {
  navigator.serviceWorker.ready.then(async (serviceWorker) => {
    await serviceWorker.showNotification(
      isHourly ? 'Incoming Cave Restock' : 'Incoming Cave Shuffle',
      {
        body: notifText,
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
