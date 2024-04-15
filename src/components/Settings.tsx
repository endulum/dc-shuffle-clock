import { type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { type IClockSettings, type TNotifPerms, type TNotifTypes } from '../types.ts'

import playNotification from '../functions/playNotification.ts'
import playSound from '../functions/playSound.ts'

import ToggleLabel from './settings-subcomponents/ToggleLabel.tsx'
import NotifToggleLabel from './settings-subcomponents/NotifToggleLabel.tsx'
import SoundSettings from './settings-subcomponents/SoundSettings.tsx'
import NotifSettings from './settings-subcomponents/NotifSettings.tsx'

import PlaySvg from '../assets/play.svg?react'

export default function Settings (
  { clockSettings, setClockSettings, notifPermission, setNotifPermission, notifSupport }: {
    clockSettings: IClockSettings
    setClockSettings: Dispatch<SetStateAction<IClockSettings>>
    notifPermission: TNotifPerms
    setNotifPermission: Dispatch<SetStateAction<TNotifPerms>>
    notifSupport: TNotifTypes
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
      <div className="setting">
        <button
          type="button"
          className="setting-test-button"
          title="Test Sound"
          aria-label="test sound"
          onClick={() => { playSound(clockSettings) }}
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

      <div className="setting">
        <button
          type="button"
          className="setting-test-button"
          title="Test Notification"
          aria-label="test notification"
          onClick={() => { playNotification(clockSettings, notifSupport, false) }}
          disabled={!(notifPermission === 'allowed')}
        >
          <PlaySvg />
        </button>

        <NotifToggleLabel
          notifPermission={notifPermission}
          setNotifPermission={setNotifPermission}
          setting={{
            id: 'notifsEnabled',
            name: 'Notifications',
            checked: clockSettings.notifsEnabled
          }}
          onInputChange={handleInputChange}
        />

        <NotifSettings
          clockSettings={clockSettings}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          notifSupport={notifSupport}
        />
      </div>
    </main>
  )
}
