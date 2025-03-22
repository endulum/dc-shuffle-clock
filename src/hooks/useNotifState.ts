import { useEffect, useState } from 'react';
import { TNotifPerms, TNotifTypes } from '../types';

export function useNotifState(): {
  permission: TNotifPerms;
  askPermission: () => Promise<void>;
  support: TNotifTypes;
  setSupport: React.Dispatch<React.SetStateAction<TNotifTypes>>;
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
    if ('Notification' in window) {
      // eslint-disable-next-line no-console
      console.log('Initializing with native notification support...');
      setSupport('browser');
    } else if ('serviceWorker' in navigator) {
      // eslint-disable-next-line no-console
      console.log('Initializing with Service Worker support...');
      setSupport('sworker');
    }
  }, []);

  return { permission, askPermission, support, setSupport };
}
