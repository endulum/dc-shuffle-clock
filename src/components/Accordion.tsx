import { useState, ChangeEvent, useRef } from 'react';

import GearSvg from '../assets/gear.svg';
import CloseSvg from '../assets/close.svg';

export default function Accordion({ settingSwitch, onInputChange, children }: {
  settingSwitch: {
    name: string,
    id: string,
    bool: boolean
  },
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  children: string | JSX.Element | JSX.Element[]
}) {
  const switchLabel = useRef<HTMLLabelElement>(null);
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="settings-accordion">
      <div className="settings-accordion-header">
        <label ref={switchLabel} className="switch-label" htmlFor={settingSwitch.id}>
          <span>
            <b>
              {settingSwitch.name}
              :
            </b>
          </span>
          <input
            type="checkbox"
            role="switch"
            id={settingSwitch.id}
            checked={settingSwitch.bool}
            onChange={onInputChange}
            onFocus={() => {
              switchLabel.current?.classList.add('focused');
            }}
            onBlur={() => {
              switchLabel.current?.classList.remove('focused');
            }}
          />

          <span className="switch-state">
            <span className="switch-text" aria-hidden>
              {settingSwitch.bool ? 'Enabled' : 'Disabled'}
            </span>
            <span className={`switch ${settingSwitch.bool && 'on'}`} />
          </span>
        </label>

        <button
          type="button"
          title={`${expanded ? 'Close' : 'Open'} extra settings for ${settingSwitch.name}`}
          className="settings-accordion-button"
          onClick={() => { setExpanded(!expanded); }}
        >
          <img src={expanded ? CloseSvg : GearSvg} alt={`${expanded ? 'Close' : 'Open'} extra settings for ${settingSwitch.name}`} />
        </button>
      </div>
      {expanded && (
      <div className="settings-accordion-body">
        {children}
      </div>
      )}
    </div>
    // <div className="settings-accordion">
    //   <div className="settings-accordion-header">
  //   <label ref={switchLabel} className="switch-label" htmlFor="soundEnabled">
  //     <span><b>Sound</b></span>
  //     <input
  //       type="checkbox"
  //       role="switch"
  //       id="soundEnabled"
  //       checked={soundEnabled}
  //       onChange={onInputChange}
  //       onFocus={() => {
  //         switchLabel.current?.classList.add('focused');
  //       }}
  //       onBlur={() => {
  //         switchLabel.current?.classList.remove('focused');
  //       }}
  //     />

  //   <span className="switch-state">
  //     <span className="switch-text" aria-hidden>
  //       {soundEnabled ? 'Enabled' : 'Disabled'}
  //     </span>
  //     <span className={`switch ${soundEnabled && 'on'}`} />
  //   </span>
  // </label>

  // <button
  //   type="button"
  //   title={expanded ? 'Close extra settings' : 'Expand extra settings'}
  //   className="settings-accordion-button"
  //   onClick={() => { setExpanded(!expanded); }}
  // >
  //   {/* Expand */}
  // </button>
  // </div>
  // {expanded && (
  // <div className="settings-accordion-body">
  //   {/* body */}
  // </div>
  //   )}
  // </div>
  );
}
