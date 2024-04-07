import { type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { type IClockSettings } from '../types.ts'
import doNotify from '../helpers/doNotify.ts'
import playSound from '../helpers/playSound.ts'

import ToggleLabel from './ToggleLabel.tsx'
import NotifToggleLabel from './NotifToggleLabel.tsx'
import SoundSettings from './SoundSettings.tsx'

import PlaySvg from '../assets/play.svg?react'

export default function SettingsFields (
  { clockSettings, setClockSettings, notifSupport, setNotifSupport }: {
    clockSettings: IClockSettings
    setClockSettings: Dispatch<SetStateAction<IClockSettings>>
    notifSupport: string
    setNotifSupport: Dispatch<SetStateAction<string>>
  }
): JSX.Element {
  function handleInputChange (event: ChangeEvent<HTMLInputElement>): void {
    switch (event.target.type) {
      case 'checkbox':
        setClockSettings(
          { ...clockSettings, [event.target.id]: event.target.checked }
        ); break
      case 'range':
        setClockSettings(
          { ...clockSettings, [event.target.id]: parseInt(event.target.value, 10) }
        ); break
      default: setClockSettings(
        { ...clockSettings, [event.target.id]: event.target.value }
      )
    }
  }

  function handleSelectChange (event: ChangeEvent<HTMLSelectElement>): void {
    setClockSettings(
      { ...clockSettings, [event.target.id]: event.target.value }
    )
  }

  return (
    <main aria-label="clock settings">
      {/* <input
        type="number"
        id="delay"
        onChange={handleInputChange}
        defaultValue={clockSettings.delay}
      /> */}

      {/* settings group for Sound */}
      <div className="setting">
        <button
          type="button"
          className="setting-test-button"
          title="Test Sound"
          aria-label="test sound"
          onClick={() => {
            playSound(
              clockSettings.soundCustomChoice,
              clockSettings.soundCustomPath,
              clockSettings.soundDefaultSelect,
              clockSettings.soundVolume
            )
          }}
        >
          <PlaySvg />
        </button>

        <ToggleLabel
          setting={{
            id: 'soundEnabled',
            name: 'Sound',
            checked: clockSettings.soundEnabled
          }}
          onInputChange={handleInputChange}
        />

        <SoundSettings
          clockSettings={clockSettings}
          setClockSettings={setClockSettings}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
      </div>

      {/* settings group for Notifications */}
      <div className="setting">
        <button
          type="button"
          className="setting-test-button"
          title="Test Notification"
          aria-label="test notification"
          onClick={() => { doNotify(null) }}
          disabled={notifSupport !== 'allowed'}
        >
          <PlaySvg />
        </button>

        <NotifToggleLabel
          notifSupport={notifSupport}
          setNotifSupport={setNotifSupport}
          setting={{
            id: 'notifsEnabled',
            name: 'Notifications',
            checked: clockSettings.notifsEnabled
          }}
          onInputChange={handleInputChange}
        />
      </div>

      {/*

      <input
        type="checkbox"
        id="biomeEnabled"
        onChange={handleInputChange}
        defaultChecked={clockSettings.biomeEnabled}
      />

      <select
        id="biomeSelect"
        onChange={handleSelectChange}
        defaultValue={clockSettings.biomeSelect}
      >
        {['Coast', 'Desert', 'Forest', 'Jungle', 'Alpine', 'Volcano', 'Holiday']
          .map((name, index) => ({ id: index + 1, name }))
          .map((biome) => (
            <option key={biome.name} value={biome.id.toString()}>
              {biome.name}
            </option>
          ))}
      </select>

      <select
        id="biomeOpenType"
        onChange={handleSelectChange}
        defaultValue={clockSettings.biomeOpenType}
      >
        <option value="tab">new tab</option>
        <option value="window">new window</option>
      </select> */}
    </main>
  )
}