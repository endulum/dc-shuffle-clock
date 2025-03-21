import { useContext } from 'react';

import { AppContext } from '../AppContext';
import { SettingSwitch } from './reusable/SettingSwitch';

export function SoundMgmt() {
  const { clockSettings } = useContext(AppContext);
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
