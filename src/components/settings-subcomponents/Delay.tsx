import { type ChangeEvent } from 'react'
import { type IClockSettings } from '../../types.ts'

export default function Delay (
  { clockSettings, handleInput }: {
    clockSettings: IClockSettings
    handleInput: (event: ChangeEvent) => void
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
            onChange={handleInput}
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
          <input
            type="checkbox"
            id="noDelayOnHourly"
            onChange={handleInput}
            defaultChecked={clockSettings.noDelayOnHourly}
          />
          <span>No delay on hourly</span>
        </label>

        <label htmlFor="noHourly" className="row">
          <input
            type="checkbox"
            id="noHourly"
            onChange={handleInput}
            defaultChecked={clockSettings.noHourly}
          />
          <span>Do not warn me at all for hourlies</span>
        </label>
      </div>
    </div>
  )
}
