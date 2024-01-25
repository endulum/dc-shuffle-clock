import { useState, useEffect, ChangeEvent } from 'react';

import Clock from './components/Clock.tsx';
import Expandable from './components/Expandable.tsx';

import {
  Settings, settingsInitializer, NotifSupport, notifSupportInitializer,
} from './types.ts';

const sounds = new Array(5).fill(0).map((_dummy, index) => `SMS Alert ${index + 1}`);

const biomes = ['Coast', 'Desert', 'Forest', 'Jungle', 'Alpine', 'Volcano', 'Holiday'].map((name, index) => ({
  id: index + 1,
  name,
}));

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

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setSettings({ ...settings, [e.target.id]: e.target.value });
  } // why two entire functions? easiest way to not have the linter complain

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
          <label className="setting-body-label" htmlFor="soundSelect">
            <span>Select Sound</span>
            <span className="spacer" />
            <select className="setting-body-input" id="soundSelect" onChange={handleSelectChange} defaultValue={settings.soundSelect}>
              {sounds.map((sound) => (
                <option key={sound} value={sound}>
                  {sound}
                </option>
              ))}
            </select>
          </label>

          <label className="setting-body-label" htmlFor="soundVolume">
            <span>Sound Volume</span>
            <span className="spacer" />
            <input className="setting-body-input" type="range" id="soundVolume" onChange={handleInputChange} defaultValue={settings.soundVolume} />
          </label>
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
          <label htmlFor="biomeEnabled">
            <input type="checkbox" id="biomeEnabled" onChange={handleInputChange} checked={settings.biomeEnabled} />
            <span>
              Jump to biome when clicked
              <small>
                Take me to
                {' '}
                <select aria-label="biome select" id="biomeSelect" onChange={handleSelectChange} defaultValue={settings.biomeSelect}>
                  {biomes.map((biome) => (
                    <option key={biome.id} value={biome.id}>
                      {biome.name}
                    </option>
                  ))}
                </select>
                {' '}
                in a
                {' '}
                <select id="biomeOpenType" onChange={handleSelectChange} defaultValue={settings.biomeOpenType}>
                  <option value="tab">new tab</option>
                  <option value="window">new window</option>
                </select>
              </small>
            </span>
          </label>

          <label htmlFor="notifAutoDismiss">
            <input type="checkbox" id="notifAutoDismiss" onChange={handleInputChange} checked={settings.notifAutoDismiss} />
            <span>Automatically dismiss notification when shuffle occurs</span>
          </label>
        </Expandable>
      </main>
    </div>
  );
}
