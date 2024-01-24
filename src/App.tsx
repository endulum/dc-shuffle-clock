import { useState, useEffect, ChangeEvent } from 'react';

import Clock from './components/Clock';
import DelaySetting from './components/DelaySetting';
import SoundSettings from './components/SoundSettings';
import NotifSettings from './components/NotifSettings';

import {
  Settings, settingsInitializer, NotifSupport, notifSupportInitializer,
} from './types';

export default function App() {
  const [settings, setSettings] = useState<Settings>(settingsInitializer);
  const [notifSupport, setNotifSupport] = useState<NotifSupport>(notifSupportInitializer);

  useEffect(() => {
    console.log(settings); // for debugging
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

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
      <main aria-label="clock settings">
        <div className="row">
          <DelaySetting delay={settings.delay} onInputChange={handleInputChange} />
        </div>

        <SoundSettings
          soundSettings={{
            soundEnabled: settings.soundEnabled,
          }}
          onInputChange={handleInputChange}
        />

        <NotifSettings
          notifSettings={{
            notifsEnabled: settings.notifsEnabled,
          }}
          onInputChange={handleInputChange}
          notifSupport={notifSupport}
          setNotifSupport={setNotifSupport}
        />
      </main>
    </div>
  );
}
