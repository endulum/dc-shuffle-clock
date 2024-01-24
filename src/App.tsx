import { useEffect, useState, ChangeEvent } from 'react';

import Clock from './components/Clock';
import Main from './components/Main';

import { Settings as SettingsType, NotifSupport } from './types';

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

export default function App() {
  function settingsOrDefault(): SettingsType {
    const settingsData = localStorage.getItem('settings');
    // bandaid! remove and fix before making public!
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (settingsData) return JSON.parse(settingsData);
    return {
      delay: 15,
      soundEnabled: false,
      notifsEnabled: false,
    };
  }

  const [settings, setSettings] = useState<SettingsType>(settingsOrDefault());
  const [notifSupport, setNotifSupport] = useState<NotifSupport>('pending');

  useEffect(() => {
    console.log(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!typeof Notification || !checkNotifSupport()) {
      setNotifSupport('unsupported');
    } else if (Notification.permission === 'denied') {
      setNotifSupport('blocked');
    } else if (Notification.permission === 'granted') {
      setNotifSupport('allowed');
    } else {
      setNotifSupport('pending');
    }
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.type) {
      case 'checkbox':
        setSettings({ ...settings, [e.target.id]: e.target.checked }); break;
      default:
        setSettings({ ...settings, [e.target.id]: parseInt(e.target.value, 10) });
    }
  }

  function handleAlert(): void {
    console.log('alert!');
  }

  return (
    <div className="app">
      <Clock onAlert={handleAlert} delay={settings.delay} />
      <Main
        settings={settings}
        onInputChange={handleInputChange}
        notifSupport={notifSupport}
        setNotifSupport={setNotifSupport}
      />
      {/* <Settings settings={settings} onInputChange={handleInputChange} /> */}
    </div>
  );
}
