export default function keepWorkerAwake (): void {
  navigator.serviceWorker.ready.then(async (registration) => {
    registration.active?.postMessage('')
  }).catch((e) => { console.warn(e) })
}
