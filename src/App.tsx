import { useEffect, useState, ChangeEvent } from 'react';

import Clock from './components/Clock';
import Settings from './components/Settings';

import { Settings as SettingsType } from './types';

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

  useEffect(() => {
    console.log(settings);
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
      <Settings settings={settings} onInputChange={handleInputChange} />
    </div>
  );
}
