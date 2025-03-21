import { useContext } from 'react';

import { AppContext } from '../AppContext';
import { SettingSwitch } from './reusable/SettingSwitch';

export function NotifMgmt() {
  const { clockSettings } = useContext(AppContext);
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
