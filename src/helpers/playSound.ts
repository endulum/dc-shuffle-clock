import { addToSessionLog } from './addToSessionLog.ts'
import { type IClockSettings } from '../types.ts'

export default function playSound (settings: IClockSettings): void {
  let sound: HTMLAudioElement | null
  if (settings.soundCustomChoice && settings.soundCustomPath !== null) {
    const audio = (document.getElementById('customSound') as HTMLAudioElement)
    sound = new Audio(audio.src)
  } else {
    sound = new Audio(`./audio/${settings.soundDefaultSelect}.mp3`)
  }
  sound.volume = settings.soundVolume / 100
  sound.play().catch((err) => {
    const time = {
      minutes: (new Date()).getMinutes(),
      seconds: (new Date()).getSeconds()
    }
    addToSessionLog(time, err)
  })
}
