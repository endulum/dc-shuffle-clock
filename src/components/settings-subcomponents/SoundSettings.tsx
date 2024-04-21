import { type ChangeEvent } from 'react'

import { type IClockSettings } from '../../types.ts'

export default function Settings (
  {
    clockSettings, handleInput, handleToggleCustomChoice,
    initCustomAudio, setCustomAudioTitle
  }: {
    clockSettings: IClockSettings
    handleInput: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleToggleCustomChoice: (event: ChangeEvent<HTMLInputElement>) => void
    initCustomAudio: () => void
    setCustomAudioTitle: (title: string) => void
  }
): JSX.Element {
  function handleAudioInput (event: ChangeEvent<HTMLInputElement>): void {
    if (
      event.target.files !== null &&
      event.target.files.length > 0
    ) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = function read (e) {
        const audioString = JSON.stringify(e.target?.result)
        const { size } = new Blob([audioString])
        // stringifying a 450kb file takes 600kb of space - about 25%+
        // which is why this conditional limit is not exactly 2mb
        if (size > 2500000) {
          // i'm ok with a native alert
          // eslint-disable-next-line no-alert
          alert('Uploaded sound is too large. Only sounds under 2MB can be stored.\n')
        } else {
          localStorage.setItem('customSoundData', audioString)
          initCustomAudio()
          setCustomAudioTitle(file.name)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="setting-body">
      <label htmlFor="soundVolume" className="row">
        <span>Volume</span>
        <input
          type="range"
          id="soundVolume"
          onChange={handleInput}
          defaultValue={clockSettings.soundVolume}
        />
      </label>

      <div className="option">
        <label htmlFor="soundDefaultChoice" className="row">
          <input
            type="radio"
            name="sound"
            id="soundDefaultChoice"
            defaultChecked={!clockSettings.soundCustomChoice}
            onChange={handleToggleCustomChoice}
          />
          <span>Use Default Sound</span>
        </label>

        <div className={clockSettings.soundCustomChoice ? 'disabled' : ''}>
          <label htmlFor="soundDefaultSelect" className="row">
            <small>Select Sound</small>
            <select
              id="soundDefaultSelect"
              onChange={handleInput}
              defaultValue={clockSettings.soundDefaultSelect}
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
          </label>
        </div>
      </div>

      <div className="option">
        <label htmlFor="soundCustomChoice" className="row">
          <input
            type="radio"
            name="sound"
            id="soundCustomChoice"
            defaultChecked={clockSettings.soundCustomChoice}
            onChange={handleToggleCustomChoice}
          />
          <span>Use Custom Sound</span>
        </label>

        <div className={clockSettings.soundCustomChoice ? '' : 'disabled'}>
          {clockSettings.soundCustomTitle !== '' && (
            <div className="row">
              <small>
                Currently saved:
                {' '}
                <i>{clockSettings.soundCustomTitle}</i>
              </small>
            </div>
          )}
          <label htmlFor="soundUpload" className="row">
            <small>Upload</small>
            <input
              type="file"
              id="soundUpload"
              accept=".wav,.mp3"
              onChange={handleAudioInput}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
