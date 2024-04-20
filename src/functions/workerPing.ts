export default function workerPing (): void {
  navigator.serviceWorker.ready.then(async (registration) => {
    registration.active?.postMessage('')
  }).catch((e) => { console.warn(e) })
}
