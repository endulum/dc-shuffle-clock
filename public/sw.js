/* // because the service worker is privileged with its own thread,
// we won't rely on the dom to provide alerts. instead,
// the worker can use a "schedule" to provide alerts.

// changing the state of the clock - its pause/play state and
// settings - should "talk" to the worker about what changed so
// it can schedule its next alert with a customized timeout.
let timeoutRef = null;
// we should best do this when:
// - clock was unpaused
// - delay was changed

// if nothing's being changed, the worker doesn't need to be talked to
// and will quietly schedule subsequent alerts with an interval.
let intervalRef = null;

// counts consecutive notifications emitted
let counter = 0;

function stopInterval() {
  clearTimeout(timeoutRef);
  clearInterval(intervalRef);
  counter = 0;
}

function startInterval(initialTimeout) {
  timeoutRef = setTimeout(() => {
    self.registration.showNotification(`Alert #${counter}`, {
      body: `This is the ${counter}th consecutive alert. It's the first alert since the clock was played or settings were changed.`,
    });
    counter++;
    intervalRef = setInterval(() => {
      self.registration.showNotification(`Alert #${counter}`, {
        body: `This is the ${counter}th consecutive alert.`,
      });
      counter++;
    }, 5000);
  }, getMsToAlert()); // use initialTimeout here
} */

self.addEventListener('message', (event) => {
  switch (event.data.type) {
    case 'notify':
      const time = (() => {
        const date = new Date();
        return { seconds: date.getSeconds(), minutes: date.getMinutes() };
      })();
      self.registration.showNotification(`Alert ${event.data.count}`, {
        body: `It is ${time.minutes.toString().padStart(2, '0')}:${time.seconds
          .toString()
          .padStart(2, '0')}. This is the ${
          event.data.count
        }th consecutive alert.`,
      });
      break;
    /* case 'start_notifying':
      startInterval();
      break;
    case 'stop_notifying':
      stopInterval();
      break; */
    default:
      console.warn('Unknown event: ', event);
  }
});

/* function getMsToAlert() {
  const seconds = (() => {
    const date = new Date();
    return date.getSeconds();
  })();

  return (5 - (seconds % 5)) * 1000;
}*/
