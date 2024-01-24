import { useState, useEffect, ChangeEvent } from 'react';

import Toggle from './Toggle';

import GearSvg from '../assets/gear.svg';
import CloseSvg from '../assets/close.svg';

import { NotifSupport } from '../types';

// function checkNotifSupport(): boolean {
//   if (!window.Notification || !Notification.requestPermission) return false;
//   if (Notification.permission === 'granted') return true;
//   try {
//     const notification = new Notification('');
//   } catch (e: unknown) {
//     if (e instanceof Error && e.name === 'TypeError') return false;
//   }
//   return true;
// }

export default function NotifSettings({
  notifSettings, onInputChange, notifSupport, setNotifSupport,
} : {
  notifSettings: {
    notifsEnabled: boolean,
  },
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  notifSupport: NotifSupport,
  setNotifSupport: (value: NotifSupport) => void
}) {
  // const [notifSupport, setNotifSupport] = useState<notifPermType>('not asked');
  const [expanded, setExpanded] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!typeof Notification || !checkNotifSupport()) {
  //     setNotifSupport('unsupported');
  //   } else if (Notification.permission === 'denied') {
  //     setNotifSupport('blocked');
  //   } else if (Notification.permission === 'granted') {
  //     setNotifSupport('allowed');
  //   } else {
  //     setNotifSupport('not asked');
  //   }
  // });

  async function askNotifPermission(): Promise<void> {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') setNotifSupport('allowed');
    if (permission === 'denied') setNotifSupport('blocked');
  }

  return (
    <>
      <div className="setting-header">
        <div className="setting-header-toggle">
          {notifSupport === 'unsupported' && (
            <i>Notifications are not supported</i>
          )}

          {notifSupport === 'blocked' && (
            <i>Notifications are blocked</i>
          )}

          {notifSupport === 'allowed' && (
            <Toggle
              setting={{
                name: 'Notifications',
                id: 'notifsEnabled',
                bool: notifSettings.notifsEnabled,
              }}
              onInputChange={onInputChange}
            />
          )}

          {notifSupport === 'pending' && (
          <button
            type="button"
            onClick={() => {
              // todo: improve this error catch?
              askNotifPermission().catch((e) => { console.error(e); });
            }}
          >
            Request notification permission
          </button>
          )}
        </div>
        <button
          type="button"
          title={notifSupport === 'allowed' ? `${expanded ? 'Close' : 'Open'} extra settings for notifications` : 'Enable notifications to see extra settings'}
          className={`settings-header-button ${notifSupport !== 'allowed' && 'disabled'}`}
          onClick={() => { setExpanded(!expanded); }}
        >
          <img src={expanded ? CloseSvg : GearSvg} alt="Extra settings for notifications" />
        </button>
      </div>
      {expanded && (
        <div className="setting-body">
          <p>extra settings for notifs go here</p>
        </div>
      )}
    </>
  );
}
