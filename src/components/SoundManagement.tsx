import { useContext, type ChangeEvent } from 'react';
import { PlayArrow } from '@mui/icons-material';

import { AppContext } from '../AppContext';
import { SettingSwitch } from './reusable/SettingSwitch';
import { SettingBody } from './reusable/SettingBody';
import { playSound } from '../functions/playSound';
import { getAudioString } from '../functions/getAudioString';
import { useCustomAudio } from '../hooks/useCustomAudio';

export function SoundManagement() {
  const { clockSettings, setClockSettings, handleInput, setError } =
    useContext(AppContext);
  const { customAudio, initCustomAudio } = useCustomAudio();

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setClockSettings({
      ...clockSettings,
      soundCustomChoice:
        event.target.id === 'soundCustomChoice'
          ? event.target.checked
          : !event.target.checked,
    });
  };

  const handleAudioInput = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) return;
    const file = event.target.files[0];
    try {
      const audioString = await getAudioString(file);
      localStorage.setItem('customSoundData', audioString);
      initCustomAudio();
      setClockSettings({ ...clockSettings, soundCustomTitle: file.name });
    } catch (e) {
      console.error(e);
      setError({
        type: 'Error uploading sound',
        message: e instanceof Error ? e.message : 'See console for details.',
      });
    }
  };

  return (
    <SettingBody
      settingBool={clockSettings.soundEnabled}
      buttonComponent={
        <button
          type="button"
          className="setting-play"
          title="Click to test sound"
          disabled={!clockSettings.soundEnabled}
          onClick={async () => {
            try {
              playSound(clockSettings, customAudio);
            } catch (e) {
              console.error(e);
              setError({
                type: 'Error testing sound',
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

      <div className="sound-grid">
        {/* select sound */}
        <input
          type="radio"
          name="sound"
          id="soundDefaultChoice"
          defaultChecked={!clockSettings.soundCustomChoice}
          onChange={handleToggle}
        />
        <label htmlFor="soundDefaultChoice">Select sound:</label>
        <label htmlFor="soundDefaultSelect" className="sr-only">
          Default sound
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

        {/* upload sound */}
        <input
          type="radio"
          name="sound"
          id="soundCustomChoice"
          defaultChecked={clockSettings.soundCustomChoice}
          onChange={handleToggle}
        />
        <label htmlFor="soundCustomChoice">Upload custom:</label>
        <label htmlFor="soundUpload" className="sr-only">
          Upload a custom sound
        </label>
        <input
          type="file"
          id="soundUpload"
          accept=".wav,.mp3"
          disabled={!clockSettings.soundCustomChoice}
          onChange={handleAudioInput}
        />
        {clockSettings.soundCustomTitle !== '' && (
          <small>
            Currently saved: <i>{clockSettings.soundCustomTitle}</i>
          </small>
        )}
      </div>
    </SettingBody>
  );
}
