import { useState, useEffect, ChangeEvent } from 'react';

import Clock from './components/Clock.tsx';
import Expandable from './components/Expandable.tsx';

import {
  Settings, settingsInitializer, NotifSupport, notifSupportInitializer,
} from './types.ts';

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
    console.log('alert!'); // for debugging
  }

  return (
    <div className="app">
      <Clock onAlert={handleAlert} delay={settings.delay} />
      <main aria-label="clock settings">
        <div className="row">
          <label className="delay-label" htmlFor="delay">
            Warn me
            {' '}
            <input
              type="number"
              value={settings.delay}
              min="1"
              max="60"
              id="delay"
              className="input-delay"
              onChange={handleInputChange}
              title="delay in seconds"
            />
            {' '}
            seconds before each shuffle.
          </label>
        </div>

        <Expandable
          setting={{
            name: 'Sound',
            id: 'soundEnabled',
            bool: settings.soundEnabled,
          }}
          onInputChange={handleInputChange}
        >
          <p>settings for sound go here</p>
        </Expandable>

        <Expandable
          setting={{
            name: 'Notifications',
            id: 'notifsEnabled',
            bool: settings.notifsEnabled,
            notifSupport,
          }}
          onInputChange={handleInputChange}
          setNotifSupport={setNotifSupport}
        >
          <p>settings for notifs go here</p>
        </Expandable>
      </main>
    </div>
  );
}
