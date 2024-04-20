import { type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { type IClockSettings, type ICustomAudio } from '../../types.ts'
import SoundUrlField from './SoundUrlField.tsx'

export default function SoundSettings (
  {
    clockSettings, setClockSettings,
    customAudio, setCustomAudio,
    handleInputChange, handleSelectChange
  }: {
    clockSettings: IClockSettings
    setClockSettings: Dispatch<SetStateAction<IClockSettings>>
    customAudio: ICustomAudio | null
    setCustomAudio: Dispatch<SetStateAction<ICustomAudio | null>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void
  }
): JSX.Element {
  function handleAudioInput (event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files !== null) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = function () {
        // eslint-disable-next-line react/no-this-in-sfc
        const str = this.result
        // bruh why not.
        const aud = new Audio(str as string)
        setCustomAudio({
          audio: aud,
          title: file.name
        })
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
          onChange={handleInputChange}
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
            onChange={(event) => {
              setClockSettings(
                { ...clockSettings, soundCustomChoice: !event.target.checked }
              )
            }}
          />
          <span>Use Default Sound</span>
        </label>

        <div className={clockSettings.soundCustomChoice ? 'disabled' : ''}>
          <label htmlFor="soundDefaultSelect" className="row">
            <small>Select Sound</small>
            <select
              id="soundDefaultSelect"
              onChange={handleSelectChange}
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
            onChange={(event) => {
              setClockSettings(
                { ...clockSettings, soundCustomChoice: event.target.checked }
              )
            }}
          />
          <span>Use Custom Sound</span>
        </label>

        <div className={clockSettings.soundCustomChoice ? '' : 'disabled'}>
          {customAudio !== null && (
            <div className="row">
              <small>
                Current saved sound:
                {' '}
                <i>{customAudio.title}</i>
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
          {/* <SoundUrlField
            handleInputChange={handleInputChange}
            clockSettings={clockSettings}
          /> */}
        </div>
      </div>

    </div>
  )
}
