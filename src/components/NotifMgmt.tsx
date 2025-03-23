import { useContext } from 'react';
import { PlayArrow } from '@mui/icons-material';

import { AppContext } from '../AppContext';
import { SettingSwitch } from './reusable/SettingSwitch';
import { SettingBody } from './reusable/SettingBody';
import { notify } from '../functions/notify';

export function NotifMgmt() {
  const {
    clockSettings,
    handleInput,
    support,
    setSupport,
    permission,
    askPermission,
    setError,
  } = useContext(AppContext);
  return (
    <SettingBody
      settingBool={clockSettings.notifsEnabled && permission === 'allowed'}
      buttonComponent={
        <button
          className="setting-play"
          title="Click to test notifications"
          onClick={async () => {
            try {
              await notify({
                string: 'This is a test notification.',
                settings: clockSettings,
                support,
                setSupport,
              });
            } catch (e) {
              console.error(e);
              setError({
                type: 'Error testing shuffle notification',
                message:
                  e instanceof Error ? e.message : 'See console for details.',
              });
            }
          }}
        >
          <PlayArrow />
        </button>
      }
      switchComponent={
        permission === 'allowed' ? (
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
        )
      }
    >
      <div>
        <div className="flex-row g-05">
          <input
            type="checkbox"
            id="biomeEnabled"
            onChange={handleInput}
            defaultChecked={clockSettings.biomeEnabled}
          />
          <label htmlFor="biomeEnabled">Jump to biome when clicked</label>
        </div>
        <div {...(!clockSettings.biomeEnabled && { className: 'disabled' })}>
          <small>
            Take me to{' '}
            <select
              id="biomeSelect"
              onChange={handleInput}
              defaultValue={clockSettings.biomeSelect}
              disabled={!clockSettings.biomeEnabled}
            >
              {[
                'Coast',
                'Desert',
                'Forest',
                'Jungle',
                'Alpine',
                'Volcano',
                'Holiday',
              ].map((biome, index) => (
                <option key={biome} value={(index + 1).toString()}>
                  {biome}
                </option>
              ))}
            </select>{' '}
            in a{' '}
            <select
              id="biomeOpenType"
              onChange={handleInput}
              defaultValue={clockSettings.biomeOpenType}
              disabled={!clockSettings.biomeEnabled || support !== 'browser'}
            >
              <option value="tab">new tab</option>
              <option value="window">new window</option>
            </select>
          </small>
        </div>
      </div>
      <div className="flex-row g-05">
        <input
          type="checkbox"
          id="notifAutoDismiss"
          onChange={handleInput}
          defaultChecked={clockSettings.notifAutoDismiss}
        />
        <label htmlFor="notifAutoDismiss">
          Dismiss notification when shuffle occurs
        </label>
      </div>
    </SettingBody>
  );
}
