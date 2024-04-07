export default function playSound (
  isCustom: boolean,
  customPath: string | null,
  defaultSelection: string | null,
  soundVolume: number
): void {
  let sound: HTMLAudioElement | null
  if (isCustom && customPath !== null) {
    sound = document.getElementById('customSound') as HTMLAudioElement
    if (sound === null) return
    // sound = new Audio()
    // sound.src = customPath
    // sound.load()
  } else {
    sound = new Audio(`./audio/${defaultSelection}.mp3`)
  }
  sound.crossOrigin = 'anonymous'
  sound.volume = soundVolume / 100
  // eslint-disable-next-line no-console
  sound.play().catch((e) => { console.warn(e) })
}
