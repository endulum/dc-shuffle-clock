import { useState, type ChangeEvent } from 'react'
import { type IClockSettings } from '../types.ts'

export default function SoundUrlField (
  { handleInputChange, clockSettings }: {
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    clockSettings: IClockSettings
  }
): JSX.Element {
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true)
  return (
    <>
      <label htmlFor="soundCustomPath" className="row">
        <small>Sound URL</small>
        <input
          type="url"
          id="soundCustomPath"
          onChange={handleInputChange}
          defaultValue={clockSettings.soundCustomPath}
        />
        <audio
          id="customSound"
          src={clockSettings.soundCustomPath}
          onError={() => { setIsUrlValid(false) }}
          onCanPlay={() => { setIsUrlValid(true) }}
        >
          <track kind="captions" />
        </audio>
      </label>
      {!isUrlValid && <small><i>Please input a valid, playable HTTPS URL.</i></small>}
    </>
  )
}
