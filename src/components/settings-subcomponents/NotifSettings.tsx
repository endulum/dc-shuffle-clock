import { type ChangeEvent } from 'react'
import { type IClockSettings, type TNotifTypes } from '../../types.ts'

export default function NotifSettings (
  { clockSettings, handleInput, notifSupport }: {
    clockSettings: IClockSettings
    handleInput: (event: ChangeEvent) => void
    notifSupport: TNotifTypes
  }
): JSX.Element {
  return (
    <div className="setting-body">
      <div className="option">
        <label htmlFor="biomeEnabled" className="row">
          <input
            type="checkbox"
            id="biomeEnabled"
            onChange={handleInput}
            defaultChecked={clockSettings.biomeEnabled}
          />
          <span>Jump to biome when clicked</span>
        </label>
        <div className={clockSettings.biomeEnabled ? '' : 'disabled'}>
          <small>
            Take me to
            {' '}
            <select
              id="biomeSelect"
              onChange={handleInput}
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
            {' '}
            in a
            {' '}
            <select
              id="biomeOpenType"
              onChange={handleInput}
              defaultValue={clockSettings.biomeOpenType}
              disabled={notifSupport !== 'browser'}
            >
              <option value="tab">new tab</option>
              <option value="window">new window</option>
            </select>
          </small>
        </div>
      </div>

      <div className="option">
        <label htmlFor="notifAutoDismiss" className="row">
          <input
            type="checkbox"
            id="notifAutoDismiss"
            onChange={handleInput}
            defaultChecked={clockSettings.notifAutoDismiss}
          />
          <span>Dismiss notification when shuffle occurs</span>
        </label>
      </div>
    </div>
  )
}
