import {
  useRef, type ChangeEvent, type Dispatch, type SetStateAction
} from 'react'

import { type NotifSupport } from '../types.ts'

export default function Toggle ({
  setting, onInputChange, setNotifSupport
}: {
  setting: {
    name: string
    id: string
    bool: boolean
    notifSupport?: NotifSupport
  }
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  setNotifSupport?: Dispatch<SetStateAction<NotifSupport>>
}): JSX.Element {
  const switchLabel = useRef<HTMLLabelElement>(null)

  async function askNotifPermission (): Promise<void> {
    if (setNotifSupport !== undefined) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') setNotifSupport('allowed')
      if (permission === 'denied') setNotifSupport('blocked')
    }
  }

  return (
    <label
      ref={switchLabel}
      className="switch-label"
      htmlFor={setting.id}
      title={setting.name === 'Notifications' && setting.notifSupport !== 'allowed' ? '' : `${setting.name} is ${setting.bool ? 'on' : 'off'}, click to turn ${setting.bool ? 'off' : 'on'}`}
      onMouseEnter={() => {
        if (setting.name === 'Notifications') {
          if (setting.notifSupport === 'allowed') switchLabel.current?.classList.add('focused')
        } else switchLabel.current?.classList.add('focused')
      }}
      onMouseLeave={() => {
        switchLabel.current?.classList.remove('focused')
      }}
    >
      <span>
        <b>
          {setting.name}
          :
        </b>
      </span>

      <input
        type="checkbox"
        role="switch"
        id={setting.id}
        checked={setting.bool}
        onChange={onInputChange}
        disabled={setting.name === 'Notifications' && setting.notifSupport !== 'allowed'}
        onFocus={() => {
          if (setting.name === 'Notifications') {
            if (setting.notifSupport === 'allowed') switchLabel.current?.classList.add('focused')
          } else switchLabel.current?.classList.add('focused')
        }}
        onBlur={() => {
          switchLabel.current?.classList.remove('focused')
        }}
      />

      {setting.name === 'Notifications' && setting.notifSupport !== 'allowed'
        ? (
          <span>
            {setting.notifSupport === 'unsupported' && (
              <i>Not Supported</i>
            )}

            {setting.notifSupport === 'blocked' && (
              <i>Blocked</i>
            )}

            {setting.notifSupport === 'pending' && (
            <button
              type="button"
              title="Request notification permission in order to enable notifications"
              onClick={() => { askNotifPermission().catch((e) => { console.error(e) }) }}
            >
              Request permission
            </button>
            )}
          </span>
          )
        : (
          <span className="switch-label-right">
            <span className="switch-text" aria-hidden>
              {setting.bool ? 'On' : 'Off'}
            </span>
            <span className={`switch ${setting.bool && 'on'}`} />
          </span>
          )}
    </label>
  )
};
