import { useContext } from 'react';

import { AppContext } from '../AppContext';
import { SettingSwitch } from './reusable/SettingSwitch';

export function NotifMgmt() {
  const { clockSettings, permission, askPermission } = useContext(AppContext);
  return permission === 'allowed' ? (
    <SettingSwitch
      setting={{
        id: 'notifsEnabled',
        name: 'Notifications',
        checked: clockSettings.notifsEnabled,
      }}
    />
  ) : (
    <div className="switch unhoverable flex-row jcspb aic p-05">
      <span>
        <b>Notifications:</b>
      </span>

      <span>
        {permission === 'unsupported' && <i>Not Supported</i>}
        {permission === 'blocked' && <i>Blocked by browser</i>}
        {permission === 'pending' && (
          <button
            type="button"
            title="Request notification permission in order to enable notifications"
            onClick={askPermission}
          >
            Ask permission
          </button>
        )}
      </span>
    </div>
  );
}
