import { ChangeEvent } from 'react';

import DelaySetting from './DelaySetting';
import NotifSettings from './NotifSettings';
import SoundSettings from './SoundSettings';
import { Settings as SettingsType, NotifSupport } from '../types';

export default function Main({
  settings, onInputChange, notifSupport, setNotifSupport,
} : {
  settings: SettingsType,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  notifSupport: NotifSupport,
  setNotifSupport: (value: NotifSupport) => void
}) {
  return (
    <main aria-label="clock settings">
      <div className="row">
        <DelaySetting delay={settings.delay} onInputChange={onInputChange} />
      </div>

      <SoundSettings
        soundSettings={{
          soundEnabled: settings.soundEnabled,
        }}
        onInputChange={onInputChange}
      />

      <NotifSettings
        notifSettings={{
          notifsEnabled: settings.notifsEnabled,
        }}
        onInputChange={onInputChange}
        notifSupport={notifSupport}
        setNotifSupport={setNotifSupport}
      />
    </main>
  );
}
