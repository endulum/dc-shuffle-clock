import { type ChangeEvent } from 'react'
import { type IClockSettings } from '../../types.ts'

export default function Delay (
  { clockSettings, handleInput }: {
    clockSettings: IClockSettings
    handleInput: (event: ChangeEvent<HTMLInputElement>) => void
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
        <div className="option">
          <label
            htmlFor="useCustomHourlyDelay"
            className={`row${clockSettings.noHourly ? ' disabled' : ''}`}
          >
            <input
              type="checkbox"
              id="useCustomHourlyDelay"
              onChange={handleInput}
              defaultChecked={clockSettings.useCustomHourlyDelay}
            />
            <span>Use custom delay for hourlies</span>
          </label>

          <div className={clockSettings.useCustomHourlyDelay ? '' : 'disabled'}>
            <label htmlFor="customHourlyDelay">
              <small>Warn me </small>
              <input
                type="number"
                value={clockSettings.customHourlyDelay}
                min="-60"
                max="60"
                id="customHourlyDelay"
                className="input-delay"
                onChange={handleInput}
                title="delay in seconds"
              />
              {' '}
              <small>seconds before each hourly</small>
            </label>
          </div>
        </div>

        <div className="option">
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
    </div>
  )
}
