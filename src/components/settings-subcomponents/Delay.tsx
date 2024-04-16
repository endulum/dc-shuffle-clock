import { type ChangeEvent } from 'react'
import { type IClockSettings } from '../../types.ts'

export default function Delay (
  { clockSettings, handleInputChange }: {
    clockSettings: IClockSettings
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  }
): JSX.Element {
  return (
    <div>
      <label className="delay-label" htmlFor="delay">
        <b>Delay:</b>
        <span>
          <input
            type="number"
            value={clockSettings.delay}
            min="1"
            max="60"
            id="delay"
            className="input-delay"
            onChange={handleInputChange}
            title="delay in seconds"
          />
          {' '}
          seconds before each shuffle
        </span>
      </label>
      <div className="delay-body">
        <label
          htmlFor="noDelayOnHourly"
          className={`row${clockSettings.noHourly ? ' disabled' : ''}`}
        >
          <input type="checkbox" id="noDelayOnHourly" onChange={handleInputChange} />
          <span>No delay on hourly</span>
        </label>
        <label htmlFor="noHourly" className="row">
          <input
            type="checkbox"
            id="noHourly"
            onChange={handleInputChange}
          />
          <span>Do not warn me at all for hourlies</span>
        </label>
      </div>
    </div>
  )
}
