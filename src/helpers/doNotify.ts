export default function doNotify (options: object | null): void {
  navigator.serviceWorker.ready.then(async (serviceWorker) => {
    if (options === null) {
      await serviceWorker.showNotification('This is a test notification.')
    }
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.warn(e)
    // alert(e)
  })
}
