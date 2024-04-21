import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'
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

  useEffect(() => {
    if (notifPermission === 'allowed') {
      try {
        const notif = new Notification('', { silent: true })
        setTimeout(() => { notif.close() }, 0)
        setNotifSupport('browser')
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === 'TypeError'
        ) setNotifSupport('sworker')
      }
    } else setNotifSupport(null)
  }, [notifPermission])

  return {
    notifPermission,
    setNotifPermission,
    notifSupport
  }
}