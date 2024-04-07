export default function playSound (
  isCustom: boolean,
  customPath: string | null,
  defaultSelection: string | null,
  soundVolume: number
): void {
  let sound: HTMLAudioElement | null
  if (isCustom && customPath !== null) {
    const audio = (document.getElementById('customSound') as HTMLAudioElement)
    sound = new Audio(audio.src)
  } else {
    sound = new Audio(`./audio/${defaultSelection}.mp3`)
  }
  sound.volume = soundVolume / 100
  // eslint-disable-next-line no-console
  sound.play().catch((e) => { console.warn(e) })
}
