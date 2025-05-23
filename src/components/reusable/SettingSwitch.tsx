import { useContext, useRef } from 'react';

import { AppContext } from '../../AppContext';

export function SettingSwitch({
  setting,
}: {
  setting: { id: string; name: string; checked: boolean };
}) {
  const { handleInput } = useContext(AppContext);
  const switchLabel = useRef<HTMLLabelElement>(null);

  return (
    <label
      ref={switchLabel}
      className="switch flex-row jcspb aic p-05"
      htmlFor={setting.id}
      title={`${setting.name} is ${
        setting.checked ? 'on' : 'off'
      }, click to turn ${setting.checked ? 'off' : 'on'}`}
    >
      <span>
        <b>{setting.name}:</b>
      </span>

      <input
        type="checkbox"
        role="switch"
        id={setting.id}
        checked={setting.checked}
        onChange={handleInput}
      />

      <span className="flex-row aic g-05">
        <span className="switch-text" aria-hidden>
          {setting.checked ? 'On' : 'Off'}
        </span>
        <span className={`switch-toggle ${setting.checked && 'on'}`} />
      </span>
    </label>
  );
}
