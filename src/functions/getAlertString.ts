import { type ITime, type IClockSettings } from '../types.ts'

export default function getAlertString (time: ITime, settings: IClockSettings): string | null {
  if ( // we're approaching an hourly and we need to be warned when or after it happens
    time.minutes === 0 &&
    settings.useCustomHourlyDelay &&
    settings.customHourlyDelay <= 0
  ) {
    if (!settings.noHourly && time.seconds === Math.abs(settings.customHourlyDelay)) {
      return `The site hourly happened ${Math.abs(settings.customHourlyDelay)} seconds ago.`
    }
  } else if ( // we're approaching an hourly and we need to be warned before it happens
    time.minutes === 59
  ) {
    const secsAtAlert = 60 - (settings.useCustomHourlyDelay
      ? settings.customHourlyDelay
      : settings.delay)
    if (!settings.noHourly && time.seconds === secsAtAlert) {
      return `The site hourly will occur in about ${60 - secsAtAlert} seconds.`
    }
  } else if ( // just a regular refresh
    (time.minutes + 1) % 5 === 0 &&
    time.seconds === 60 - settings.delay
  ) {
    return `The next cave refresh will occur in ${settings.delay} seconds.`
  }

  return null
}
