import { type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { type IClockSettings } from '../types.ts'

import ToggleLabel from './ToggleLabel.tsx'

import PlaySvg from '../assets/play.svg?react'
import NotifToggleLabel from './NotifToggleLabel.tsx'

export default function SettingsFields (
  { clockSettings, setClockSettings, notifSupport, setNotifSupport }: {
    clockSettings: IClockSettings
    setClockSettings: Dispatch<SetStateAction<IClockSettings>>
    notifSupport: string
    setNotifSupport: Dispatch<SetStateAction<string>>
  }
): JSX.Element {
  function handleInputChange (e: ChangeEvent<HTMLInputElement>): void {
    switch (e.target.type) {
      case 'checkbox':
        setClockSettings(
          { ...clockSettings, [e.target.id]: e.target.checked }
        ); break
      default:
        setClockSettings(
          { ...clockSettings, [e.target.id]: parseInt(e.target.value, 10) }
        )
    }
  }

  function handleSelectChange (e: ChangeEvent<HTMLSelectElement>): void {
    setClockSettings(
      { ...clockSettings, [e.target.id]: e.target.value }
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
      </div>

      {/* settings group for Notifications */}
      <div className="setting">
        <button
          type="button"
          className="setting-test-button"
          title="Test Notification"
          aria-label="test notification"
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

      {/* <select
        id="soundSelect"
        onChange={handleSelectChange}
        defaultValue={clockSettings.soundSelect}
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

      <input
        type="range"
        id="soundVolume"
        onChange={handleInputChange}
        defaultValue={clockSettings.soundVolume}
      />

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
