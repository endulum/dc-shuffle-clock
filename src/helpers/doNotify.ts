import { checkNotificationSupport, checkServiceWorkerSupport } from './notifUtils.ts'
import { addToSessionLog } from './addToSessionLog.ts'
import { type IClockSettings } from '../types.ts'

export default function doNotify (
  settings: IClockSettings,
  isHourly: boolean
): void {
  let notifText = ''
  if (isHourly) {
    notifText = `The hourly cave restock will occur in about ${settings.delay} seconds.`
  } else notifText = `The next cave shuffle will occur in ${settings.delay} seconds.`

  if (checkNotificationSupport()) {
    try { notifyWithNotif(settings, isHourly, notifText) } catch (err) {
      const time = {
        minutes: (new Date()).getMinutes(),
        seconds: (new Date()).getSeconds()
      }
      addToSessionLog(time, err)
    }
  } else if (checkServiceWorkerSupport()) notifyWithSw(settings, isHourly, notifText)
  // try {
  //   notifyWithNotif(settings, isHourly, notifText)
  // } catch {
  //   notifyWithSw(settings, isHourly, notifText)
  // }
}

function notifyWithNotif (
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

function notifyWithSw (
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
  }).catch((err) => {
    const time = {
      minutes: (new Date()).getMinutes(),
      seconds: (new Date()).getSeconds()
    }
    addToSessionLog(time, err)
  // alert(e)
  })
}
