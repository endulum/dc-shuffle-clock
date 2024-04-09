import { type Dispatch, type SetStateAction } from 'react'
import { type IClockSettings } from '../types.ts'

export default function DelayField (
  { clockSettings, setClockSettings }: {
    clockSettings: IClockSettings
    setClockSettings: Dispatch<SetStateAction<IClockSettings>>
  }
): JSX.Element {
  return (
    <div className="delay">
      <label className="delay-label" htmlFor="delay">
        Warn me
        {' '}
        <input
          type="number"
          value={clockSettings.delay}
          min="1"
          max="60"
          id="delay"
          className="input-delay"
          onChange={(event) => {
            setClockSettings(
              { ...clockSettings, delay: parseInt(event.target.value, 10) }
            )
          }}
          title="delay in seconds"
        />
        {' '}
        seconds before each shuffle.
      </label>
    </div>
  )
}
