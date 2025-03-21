import { useContext } from 'react';

import { SettingsContext } from '../SettingsContext';
import { SettingSwitch } from './reusable/SettingSwitch';

export function SoundMgmt() {
  const { clockSettings } = useContext(SettingsContext);
  return (
    <SettingSwitch
      setting={{
        id: 'soundEnabled',
        name: 'Sound',
        checked: clockSettings.soundEnabled,
      }}
    />
  );
}
