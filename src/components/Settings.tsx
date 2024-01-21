import { ChangeEvent } from 'react';

import { Settings as SettingsType } from '../types';

export default function Settings({ settings, onInputChange } : {
  settings: SettingsType,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <main title="Shuffle Clock Settings">
      <input
        type="number"
        value={settings.delay}
        min="1"
        max="60"
        id="delay"
        onChange={onInputChange}
      />
    </main>
  );
}
