import { type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { type IClockSettings } from '../types.ts'

export default function SettingsFields ({ clockSettings, setClockSettings }: {
  clockSettings: IClockSettings
  setClockSettings: Dispatch<SetStateAction<IClockSettings>>
}): JSX.Element {
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
    <main>
      <input
        type="number"
        id="delay"
        onChange={handleInputChange}
        defaultValue={clockSettings.delay}
      />

      <input
        type="checkbox"
        id="soundEnabled"
        onChange={handleInputChange}
        defaultChecked={clockSettings.soundEnabled}
      />

      <select
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
        id="notifsEnabled"
        onChange={handleInputChange}
        defaultChecked={clockSettings.notifsEnabled}
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
      </select>
    </main>
  )
}
