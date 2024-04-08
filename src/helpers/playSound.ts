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
  // eslint-disable-next-line no-console
  sound.play().catch((e) => { console.warn(e) })
}
