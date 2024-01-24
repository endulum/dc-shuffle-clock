export interface Settings {
  delay: number,
  soundEnabled: boolean,
  notifsEnabled: boolean
}

export function settingsInitializer(): Settings {
  const settingsData = localStorage.getItem('settings');
  if (settingsData) {
    try {
      const settingsJSON: Settings = JSON.parse(settingsData) as Settings;
      return settingsJSON;
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.warn('Error occurred when accessing local storage. Using default settings instead.');
    }
  }
  return {
    delay: 15,
    soundEnabled: false,
    notifsEnabled: false,
  };
}

export type NotifSupport = 'allowed' | 'pending' | 'blocked' | 'unsupported'

function checkNotifSupport(): boolean {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  try {
    // eslint-disable-next-line no-new
    new Notification('');
    // this is intended to be "thrown out" anyway
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'TypeError') return false;
  }
  return true;
}

export function notifSupportInitializer(): NotifSupport {
  if (!('Notification' in window) || !checkNotifSupport()) return 'unsupported';
  if (Notification.permission === 'denied') return 'blocked';
  if (Notification.permission === 'granted') return 'allowed';
  return 'pending';
}
