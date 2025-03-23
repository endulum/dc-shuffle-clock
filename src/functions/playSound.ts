import { type IClockSettings } from '../types.ts';

export function playSound(
  settings: IClockSettings,
  customAudio: HTMLAudioElement | null
): void {
  let sound: HTMLAudioElement;
  if (settings.soundCustomChoice && customAudio !== null) {
    sound = customAudio;
  } else {
    sound = new Audio(`./audio/${settings.soundDefaultSelect}.mp3`);
  }
  sound.volume = settings.soundVolume / 100;
  sound.play();
}
