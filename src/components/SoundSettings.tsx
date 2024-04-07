import { type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { type IClockSettings } from '../types.ts'
import SoundUrlField from './SoundUrlField.tsx'

export default function SoundSettings (
  { clockSettings, setClockSettings, handleInputChange, handleSelectChange }: {
    clockSettings: IClockSettings
    setClockSettings: Dispatch<SetStateAction<IClockSettings>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void
  }
): JSX.Element {
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
          <SoundUrlField
            handleInputChange={handleInputChange}
            clockSettings={clockSettings}
          />
        </div>
      </div>

    </div>
  )
}