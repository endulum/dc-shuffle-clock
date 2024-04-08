import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import ToggleLabel from './ToggleLabel.tsx'
import {
  checkNotificationSupport, checkServiceWorkerSupport
} from '../helpers/notifUtils.ts'

export default function NotifToggleLabel (
  { notifSupport, setNotifSupport, setting, onInputChange }: {
    notifSupport: string
    setNotifSupport: Dispatch<SetStateAction<string>>
    setting: { id: string, name: string, checked: boolean }
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  }
): JSX.Element {
  async function askNotifPermission (): Promise<void> {
    if (setNotifSupport !== undefined) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        if (checkNotificationSupport()) setNotifSupport('allowed (notif)')
        else if (checkServiceWorkerSupport()) setNotifSupport('allowed (sw)')
      }
      if (permission === 'denied') setNotifSupport('blocked')
    }
  }

  return notifSupport.startsWith('allowed')
    ? (
      <ToggleLabel
        setting={{
          id: 'notifsEnabled',
          name: 'Notifications',
          checked: setting.checked
        }}
        onInputChange={onInputChange}
      />
      )
    : (
      <div className="switch-label">
        <span>
          <b>
            {setting.name}
            :
          </b>
        </span>

        <span>
          {notifSupport === 'unsupported' && (
          <i>Not Supported</i>
          )}

          {notifSupport === 'blocked' && (
          <i>Blocked</i>
          )}

          {notifSupport === 'pending' && (
            <button
              type="button"
              title="Request notification permission in order to enable notifications"
              onClick={() => {
                askNotifPermission().catch((e) => {
                  // eslint-disable-next-line no-console
                  console.error(e)
                  setNotifSupport('unsupported')
                })
              }}
            >
              Ask permission
            </button>
          )}
        </span>
      </div>
      )
}
