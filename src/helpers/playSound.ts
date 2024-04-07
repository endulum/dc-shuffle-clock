export default function playSound (soundSelect: string, soundVolume: number): void {
  const sound = new Audio(`./audio/${soundSelect}.mp3`)
  sound.volume = soundVolume / 100
  // eslint-disable-next-line no-console
  sound.play().catch((e) => { console.warn(e) })
}
