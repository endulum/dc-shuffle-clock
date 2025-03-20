import { SettingSwitch } from './reusable/SettingSwitch';

export function NotifMgmt() {
  return (
    <SettingSwitch
      setting={{ id: 'notifsEnabled', name: 'Notifications', checked: false }}
    />
  );
}
