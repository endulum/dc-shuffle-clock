import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'
import NoSleep from 'nosleep.js'

import { addToEventLog } from '../functions/addToEventLog.ts'
import { type TNotifPerms, type TNotifTypes } from '../types.ts'

export default function useNotifSettings (): {
  notifPermission: TNotifPerms
  setNotifPermission: Dispatch<SetStateAction<TNotifPerms>>
  notifSupport: TNotifTypes
} {
  const [notifPermission, setNotifPermission] = useState<TNotifPerms>(() => {
    if (
      !('Notification' in window) &&
      !('serviceWorker' in navigator)
    ) return 'unsupported'
    if (Notification.permission === 'denied') return 'blocked'
    if (Notification.permission === 'granted') return 'allowed'
    return 'pending'
  })

  const [notifSupport, setNotifSupport] = useState<TNotifTypes>(null)

  const nosleep = new NoSleep()

  useEffect(() => {
    if (notifPermission === 'allowed') {
      nosleep.enable().catch((e) => {
        console.error(e)
        addToEventLog(e)
      })
      try {
        const notif = new Notification('', { silent: true })
        setTimeout(() => { notif.close() }, 0)
        setNotifSupport('browser')
        addToEventLog('INIT: Using native browser notifs.')
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === 'TypeError'
        ) {
          setNotifSupport('sworker')
          addToEventLog('INIT: Using SWorker notifs.')
        }
      }
    } else setNotifSupport(null)
  }, [notifPermission])

  return {
    notifPermission,
    setNotifPermission,
    notifSupport
  }
}
