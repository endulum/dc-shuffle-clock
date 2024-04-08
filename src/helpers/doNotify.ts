import { type IClockSettings } from '../types.ts'

export default function doNotify (settings: IClockSettings, isHourly: boolean): void {
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
