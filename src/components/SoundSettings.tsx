import { useState, ChangeEvent } from 'react';

import Toggle from './Toggle';

import GearSvg from '../assets/gear.svg';
import CloseSvg from '../assets/close.svg';

export default function SoundSettings({ soundSettings, onInputChange } : {
  soundSettings: {
    soundEnabled: boolean
  },
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <>
      <div className="setting-header">
        <div className="setting-header-toggle">

          <Toggle
            setting={{
              name: 'Sound',
              id: 'soundEnabled',
              bool: soundSettings.soundEnabled,
            }}
            onInputChange={onInputChange}
          />

        </div>
        <button
          type="button"
          title={`${expanded ? 'Close' : 'Open'} extra settings for sound`}
          className="settings-header-button"
          onClick={() => { setExpanded(!expanded); }}
        >
          <img src={expanded ? CloseSvg : GearSvg} alt="Extra settings for notifications" />
        </button>
      </div>
      {expanded && (
        <div className="setting-body">
          <p>extra settings for sounds go here</p>
        </div>
      )}
    </>
  );
}
