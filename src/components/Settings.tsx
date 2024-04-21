import { type ChangeEvent } from 'react'

import Delay from './settings-subcomponents/Delay.tsx'
import ToggleLabel from './settings-subcomponents/ToggleLabel.tsx'
import NotifToggleLabel from './settings-subcomponents/NotifToggleLabel.tsx'
import SoundSettings from './settings-subcomponents/SoundSettings.tsx'
import NotifSettings from './settings-subcomponents/NotifSettings.tsx'
import { type TNotifPerms, type IClockSettings, type TNotifTypes } from '../types.ts'

import PlaySvg from '../assets/play.svg?react'

export default function Settings (
  {
    clockSettings, setClockSettings,
    testSound, testNotification,
    notifPermission, setNotifPermission, notifSupport,
    initCustomAudio
  }: {
    clockSettings: IClockSettings
    setClockSettings: (settings: IClockSettings) => void
    testSound: () => void
    testNotification: () => void
    notifPermission: TNotifPerms
    setNotifPermission: (permission: TNotifPerms) => void
    notifSupport: TNotifTypes
    initCustomAudio: () => void
  }
): JSX.Element {
  function handleInput (
    event: ChangeEvent
    // i would rather typeguard within the func than have to paste
    // "event: ChangeEvent<HTMLInputElement | HTMLSelectElement>"
    // wherever i pass this function
  ): void {
    if (
      'type' in event.target &&
      'value' in event.target &&
      typeof event.target.value === 'string'
    ) {
      switch (event.target.type) {
        case 'checkbox':
          if ('checked' in event.target) {
            setClockSettings(
              { ...clockSettings, [event.target.id]: event.target.checked }
            )
          } break
        case 'range':
          setClockSettings(
            { ...clockSettings, [event.target.id]: parseInt(event.target.value, 10) }
          ); break
        case 'number':
          setClockSettings(
            { ...clockSettings, [event.target.id]: parseInt(event.target.value, 10) }
          ); break
        default: setClockSettings(
          { ...clockSettings, [event.target.id]: event.target.value }
        )
      }
    }
  }

  return (
    <main aria-label="Clock Settings">
      {/* delay-related settings */}
      <Delay
        clockSettings={clockSettings}
        handleInput={handleInput}
      />

      {/* sound-related settings */}
      <div className="setting">
        <button
          type="button"
          className="setting-test-button"
          title="Test Sound"
          aria-label="test sound"
          onClick={testSound}
        >
          <PlaySvg />
        </button>

        <ToggleLabel
          setting={{
            id: 'soundEnabled',
            name: 'Sound',
            checked: clockSettings.soundEnabled
          }}
          handleInput={handleInput}
        />

        <SoundSettings
          clockSettings={clockSettings}
          handleInput={handleInput}
          handleToggleCustomChoice={(event: ChangeEvent<HTMLInputElement>) => {
            setClockSettings(
              {
                ...clockSettings,
                soundCustomChoice: event.target.id === 'soundCustomChoice'
                  ? event.target.checked
                  : !event.target.checked
              }
            )
          }}
          initCustomAudio={initCustomAudio}
          setCustomAudioTitle={(title: string) => {
            setClockSettings({ ...clockSettings, soundCustomTitle: title })
          }}
        />
      </div>

      {/* notif-related settings */}
      <div className="setting">
        <button
          type="button"
          className="setting-test-button"
          title="Test Notification"
          aria-label="test notification"
          onClick={testNotification}
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
          handleInput={handleInput}
        />

        <NotifSettings
          clockSettings={clockSettings}
          handleInput={handleInput}
          notifSupport={notifSupport}
        />
      </div>
    </main>
  )
}
