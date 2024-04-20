import { addToEventLog } from './addToEventLog.ts'
import { type IClockSettings } from '../types.ts'

export default function playSound (settings: IClockSettings, customAudio?: HTMLAudioElement): void {
  let sound: HTMLAudioElement
  if (settings.soundCustomChoice && customAudio !== undefined) {
    sound = customAudio
  } else {
    sound = new Audio(`./audio/${settings.soundDefaultSelect}.mp3`)
  }
  sound.volume = settings.soundVolume / 100
  sound.play().catch((err) => { addToEventLog(err) })
}
