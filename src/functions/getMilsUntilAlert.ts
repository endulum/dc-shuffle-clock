import { IClockSettings, ITime } from '../types';

const minutesToSecs = (minutes: number) => 60 * minutes;

export function getMilsUntilAlert({
  time,
  settings,
}: {
  time?: ITime;
  settings: IClockSettings;
}) {
  // get or calculate current time
  const t: ITime =
    time ??
    (() => {
      const date = new Date();
      return {
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      };
    })();

  // calculate next planned alert
  let nextAlertSeconds: number;

  if (t.minutes >= 55) {
    // approaching hourly
    if (settings.noHourly === true)
      // add five minutes to "skip" the hourly, and just use shuffle delay
      nextAlertSeconds =
        minutesToSecs(4 - (t.minutes % 5) + 5) +
        (60 - t.seconds - settings.delay);
    else if (settings.useCustomHourlyDelay)
      nextAlertSeconds =
        minutesToSecs(4 - (t.minutes % 5)) +
        (60 - t.seconds - settings.customHourlyDelay);
    else
      nextAlertSeconds =
        minutesToSecs(4 - (t.minutes % 5)) + (60 - t.seconds - settings.delay);
  } else {
    // it's past reset and we have a negative custom delay
    if (
      t.minutes === 0 &&
      settings.useCustomHourlyDelay &&
      settings.customHourlyDelay < 0
    )
      nextAlertSeconds = -settings.customHourlyDelay - t.seconds;
    // approaching regular shuffle
    else
      nextAlertSeconds =
        minutesToSecs(4 - (t.minutes % 5)) + (60 - t.seconds - settings.delay);
  }

  return nextAlertSeconds * 1000;
}
