import { ChangeEvent } from 'react';

import Accordion from './Accordion';

import { Settings as SettingsType } from '../types';

export default function Settings({ settings, onInputChange } : {
  settings: SettingsType,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}) {
  return (
    <main title="Shuffle Clock Settings">
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
          onChange={onInputChange}
          // the accessibility tree (mozilla) currently reads this as:
          // "Warn me 10 seconds before each shuffle."
          // with the aria-label "delay in seconds" it reads:
          // "Warn me delay in seconds 10 seconds before each shuffle."
          // so perhaps an aria-label is redundant here?
        />
        {' '}
        seconds before each shuffle.
      </label>

      <Accordion
        settingSwitch={{
          name: 'Sound',
          id: 'soundEnabled',
          bool: settings.soundEnabled,
        }}
        // soundEnabled={settings.soundEnabled}
        onInputChange={onInputChange}
      >
        <p>extra settings for sound go here</p>
      </Accordion>

      <Accordion
        settingSwitch={{
          name: 'Notifications',
          id: 'notifsEnabled',
          bool: settings.notifsEnabled,
        }}
        // soundEnabled={settings.soundEnabled}
        onInputChange={onInputChange}
      >
        <p>extra settings for notifications go here</p>
      </Accordion>
    </main>
  );
}
