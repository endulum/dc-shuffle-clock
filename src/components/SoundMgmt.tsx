import { useContext, type ChangeEvent } from 'react';
import { PlayArrow } from '@mui/icons-material';

import { AppContext } from '../AppContext';
import { SettingSwitch } from './reusable/SettingSwitch';
import { SettingBody } from './reusable/SettingBody';

export function SoundMgmt() {
  const { clockSettings, setClockSettings, handleInput } =
    useContext(AppContext);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setClockSettings({
      ...clockSettings,
      soundCustomChoice:
        event.target.id === 'soundCustomChoice'
          ? event.target.checked
          : !event.target.checked,
    });
  };

  return (
    <SettingBody
      settingBool={clockSettings.soundEnabled}
      buttonComponent={
        <button
          className="setting-play"
          title="Click to test sound"
          onClick={async () => {
            // todo: play sound
          }}
        >
          <PlayArrow />
        </button>
      }
      switchComponent={
        <SettingSwitch
          setting={{
            id: 'soundEnabled',
            name: 'Sound',
            checked: clockSettings.soundEnabled,
          }}
        />
      }
    >
      <div className="flex-row g-1">
        <label htmlFor="soundVolume">Volume</label>
        <input
          type="range"
          id="soundVolume"
          value={clockSettings.soundVolume}
          onChange={handleInput}
          className="flg"
        />
      </div>

      <div className="flex-col ais g-25">
        <div className="flex-row g-05">
          <input
            type="radio"
            name="sound"
            id="soundDefaultChoice"
            defaultChecked={!clockSettings.soundCustomChoice}
            onChange={handleToggle}
          />
          <label htmlFor="soundDefaultChoice">Use default sound</label>
        </div>
        <div
          className={`flex-row g-05 w100 ${
            clockSettings.soundCustomChoice ? 'disabled' : ''
          }`}
        >
          <label htmlFor="soundDefaultSelect">
            <small>Select sound</small>
          </label>
          <select
            className="flg"
            id="soundDefaultSelect"
            onChange={handleInput}
            defaultValue={clockSettings.soundDefaultSelect}
            disabled={clockSettings.soundCustomChoice}
          >
            {new Array(5)
              .fill(0)
              .map((_dummy, index) => `SMS Alert ${index + 1}`)
              .map((sound) => (
                <option key={sound} value={sound}>
                  {sound}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="flex-col ais g-25">
        <div className="flex-row g-05">
          <input
            type="radio"
            name="sound"
            id="soundCustomChoice"
            defaultChecked={clockSettings.soundCustomChoice}
            onChange={handleToggle}
          />
          <label htmlFor="soundCustomChoice">Upload custom sound</label>
        </div>
        <div className={clockSettings.soundCustomChoice ? '' : 'disabled'}>
          {clockSettings.soundCustomTitle !== '' && (
            <div className="row">
              <small>
                Currently saved: <i>{clockSettings.soundCustomTitle}</i>
              </small>
            </div>
          )}
          <label htmlFor="soundUpload" className="row">
            <input
              aria-label="upload custom sound as a file"
              type="file"
              id="soundUpload"
              accept=".wav,.mp3"
              disabled={!clockSettings.soundCustomChoice}
              onChange={() => {
                // todo: handle upload
              }}
            />
          </label>
        </div>
      </div>
    </SettingBody>
  );
}
