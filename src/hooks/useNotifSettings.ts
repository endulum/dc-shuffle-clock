import { useEffect, useState } from 'react';
import { TNotifPerms, TNotifTypes } from '../types';

export function useNotifState(): {
  permission: TNotifPerms;
  askPermission: () => Promise<void>;
  support: TNotifTypes;
} {
  const [permission, setPermission] = useState<TNotifPerms>(() => {
    // something to keep in mind is the
    // distinction between window and navigator
    if (!('Notification' in window) && !('serviceWorker' in navigator))
      return 'unsupported';
    if (Notification.permission === 'denied') return 'blocked';
    if (Notification.permission === 'granted') return 'allowed';
    return 'pending';
  });

  const [support, setSupport] = useState<TNotifTypes>(null);

  async function askPermission(): Promise<void> {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') setPermission('allowed');
      if (permission === 'denied') setPermission('blocked');
    } catch (e) {
      console.warn(e);
      setPermission('unsupported');
    }
  }

  useEffect(() => {
    if (permission !== 'allowed') return;
    try {
      // ok, so my intention is to prioritize the Notification API
      // and failsafe to the service worker. some mobile browsers
      // will have (`Notification` in window) be true but throw
      // an error when a real notification is invoked, hence this.
      // todo: find a "cleaner" way, because dummy notifs are annoying
      const notif = new Notification('', { silent: true });
      setTimeout(() => {
        notif.close();
      }, 1);
      setSupport('browser');
    } catch (err) {
      if (err instanceof Error && err.name === 'TypeError') {
        setSupport('sworker');
      }
    }
  }, []);

  return { permission, askPermission, support };
}
