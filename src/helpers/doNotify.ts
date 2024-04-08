import { type IClockSettings } from '../types.ts'

export default function doNotify (
  notifSupport: string,
  settings: IClockSettings,
  isHourly: boolean
): void {
  if (notifSupport.endsWith('(notif)')) {
    try {
      notifyWithNotif(settings, isHourly)
    } catch {
      notifyWithSw(settings, isHourly)
    }
  }

  if (notifSupport.endsWith('(sw)')) {
    notifyWithSw(settings, isHourly)
  }
}

function notifyWithNotif (
  settings: IClockSettings,
  isHourly: boolean
): void {
  let notifText = ''
  if (isHourly) { notifText = `The hourly shuffle will occur in about ${settings.delay} seconds.` } else notifText = `The next cave shuffle will occur in ${settings.delay} seconds.`
  const notif = new Notification('Cave Shuffle Clock', { body: notifText })

  if (settings.biomeEnabled) {
    notif.addEventListener('click', (e) => {
      e.preventDefault()
      const url = `https://dragcave.net/locations/${settings.biomeSelect}`
      if (settings.biomeOpenType === 'tab') window.open(url, '_blank')
      if (settings.biomeOpenType === 'window') window.open(url, '', 'width=900,height=500')
    })
  }
}

function notifyWithSw (
  settings: IClockSettings,
  isHourly: boolean
): void {
  navigator.serviceWorker.ready.then(async (serviceWorker) => {
    await serviceWorker.showNotification(
      isHourly ? 'Incoming Cave Restock' : 'Incoming Cave Shuffle',
      {
        body: isHourly
          ? `The hourly cave restock will occur in about ${settings.delay} seconds.`
          : `The next cave shuffle will occur in ${settings.delay} seconds.`,
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
  }).catch((e) => {
  // eslint-disable-next-line no-console
    console.warn(e)
  // alert(e)
  })
}
