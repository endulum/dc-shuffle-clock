import { useContext } from 'react';

import { SettingsContext } from '../SettingsContext';
import { SettingSwitch } from './reusable/SettingSwitch';

export function NotifMgmt() {
  const { clockSettings } = useContext(SettingsContext);
  return (
    <SettingSwitch
      setting={{
        id: 'notifsEnabled',
        name: 'Notifications',
        checked: clockSettings.notifsEnabled,
      }}
    />
  );
}
