import {
  useState, ChangeEvent, SetStateAction, Dispatch,
} from 'react';

import Toggle from './Toggle';

import { NotifSupport } from '../types';

import GearSvg from '../assets/gear.svg';
import CloseSvg from '../assets/close.svg';

export default function Expandable({
  children, setting, onInputChange, setNotifSupport,
}: {
  setting: {
    name: string,
    id: string,
    bool: boolean,
    notifSupport?: NotifSupport
  },
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  children: JSX.Element | JSX.Element[],
  // todo: research this issue
  setNotifSupport?: Dispatch<SetStateAction<NotifSupport>>
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <>
      <div className="setting-header">
        <Toggle
          setting={{
            name: setting.name,
            id: setting.id,
            bool: setting.bool,
            notifSupport: setting.notifSupport,
          }}
          onInputChange={onInputChange}
          setNotifSupport={setNotifSupport}
        />

        <button
          type="button"
          title={setting.name === 'Notifications' && setting.notifSupport !== 'allowed' ? 'Enable notifications to see extra settings' : `${expanded ? 'Close' : 'Open'} extra settings for ${setting.name}`}
          className={`settings-header-button ${setting.name === 'Notifications' && setting.notifSupport !== 'allowed' && 'disabled'}`}
          onClick={() => { setExpanded(!expanded); }}
        >
          <img src={expanded ? CloseSvg : GearSvg} alt={`Extra settings for ${setting.name}`} />
        </button>

      </div>
      {expanded && (
      <div className="setting-body">
        {children}
      </div>
      )}
    </>
  );
}
