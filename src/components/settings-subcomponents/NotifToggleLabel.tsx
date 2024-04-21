import { type ChangeEvent } from 'react'
import ToggleLabel from './ToggleLabel.tsx'
import { type TNotifPerms } from '../../types.ts'
import { addToEventLog } from '../../functions/addToEventLog.ts'

export default function NotifToggleLabel (
  { notifPermission, setNotifPermission, setting, handleInput }: {
    notifPermission: TNotifPerms
    setNotifPermission: (permission: TNotifPerms) => void
    setting: { id: string, name: string, checked: boolean }
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void
  }
): JSX.Element {
  async function askNotifPermission (): Promise<void> {
    if (setNotifPermission !== undefined) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') setNotifPermission('allowed')
      if (permission === 'denied') setNotifPermission('blocked')
    }
  }

  return notifPermission === 'allowed'
    ? (
      <ToggleLabel
        setting={{
          id: 'notifsEnabled',
          name: 'Notifications',
          checked: setting.checked
        }}
        handleInput={handleInput}
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
          {notifPermission === 'unsupported' && (
          <i>Not Supported</i>
          )}

          {notifPermission === 'blocked' && (
          <i>Blocked</i>
          )}

          {notifPermission === 'pending' && (
            <button
              type="button"
              title="Request notification permission in order to enable notifications"
              onClick={() => {
                askNotifPermission().catch((err) => {
                  console.error(err)
                  addToEventLog(err)
                  setNotifPermission('unsupported')
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
