/* eslint-disable @typescript-eslint/no-explicit-any */

// i don't want to refactor components to account for no
// service worker support, so this is a callback wrapper
// that instead does nothing if there is no such support.
function withServiceWorker(callback: (...args: any[]) => Promise<void>) {
  return async (...args: any[]) => {
    if ('serviceWorker' in navigator) await callback(...args);
  };
}

async function postToWorker(message: unknown): Promise<void> {
  const serviceWorker = await navigator.serviceWorker.ready;
  if (serviceWorker.active) {
    serviceWorker.active.postMessage(message);
  }
}

/* export const play = withServiceWorker(async () =>
  postToWorker({ type: 'start_notifying' })
);

export const pause = withServiceWorker(async () =>
  postToWorker({ type: 'stop_notifying' })
); */

export const notify = withServiceWorker(async (count: number) => {
  postToWorker({ type: 'notify', count });
});
