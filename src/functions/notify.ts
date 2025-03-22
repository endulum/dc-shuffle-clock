import { IClockSettings, TNotifTypes } from '../types';

export async function notify({
  string,
  settings,
  support,
  setSupport,
}: {
  string: string;
  settings: IClockSettings;
  support: TNotifTypes;
  setSupport: React.Dispatch<React.SetStateAction<TNotifTypes>>;
}) {
  try {
    if (support === 'sworker') {
      try {
        await notifyWithSw(string, settings);
      } catch {
        await notifyWithApi(string, settings);
        console.warn(
          'Notifying using service worker failed, switching to native notifications...'
        );
        setSupport('browser');
      }
    } else if (support === 'browser') {
      try {
        await notifyWithApi(string, settings);
      } catch {
        await notifyWithSw(string, settings);
        console.warn(
          'Notifying using native notifications failed, switching to service worker...'
        );
        setSupport('sworker');
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function notifyWithSw(string: string, settings: IClockSettings) {
  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification('Incoming Cave Shuffle', {
    body: string,
    data: {
      canJump: settings.biomeEnabled,
      url: `https://dragcave.net/locations/${settings.biomeSelect}`,
    },
  });

  if (settings.notifAutoDismiss) {
    const notif = (await registration.getNotifications())[0];
    setTimeout(() => {
      notif.close();
    }, settings.delay * 1000);
  }
}

async function notifyWithApi(string: string, settings: IClockSettings) {
  const notif = new Notification('Incoming Cave Shuffle', { body: string });
  if (settings.biomeEnabled) {
    notif.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `https://dragcave.net/locations/${settings.biomeSelect}`;
      if (settings.biomeOpenType === 'tab') window.open(url, '_blank');
      if (settings.biomeOpenType === 'window')
        window.open(url, '', 'width=900,height=500');
    });
  }

  if (settings.notifAutoDismiss) {
    setTimeout(() => {
      notif.close();
    }, settings.delay * 1000);
  }
}
