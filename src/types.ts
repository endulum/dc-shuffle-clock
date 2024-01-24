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

export function notifSupportInitializer(): NotifSupport {
  if (!typeof Notification || !checkNotifSupport()) return 'unsupported';
  if (Notification.permission === 'denied') return 'blocked';
  if (Notification.permission === 'granted') return 'allowed';
  return 'pending';
}

function checkNotifSupport(): boolean {
  if (!window.Notification || !Notification.requestPermission) return false;
  if (Notification.permission === 'granted') return true;
  try {
    const notification = new Notification('');
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'TypeError') return false;
  }
  return true;
}
