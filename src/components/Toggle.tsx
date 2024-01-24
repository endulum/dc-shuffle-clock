import { useRef, ChangeEvent } from 'react';

export default function Toggle({ setting, onInputChange }: {
  setting: {
    name: string,
    id: string,
    bool: boolean
  },
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  const switchLabel = useRef<HTMLLabelElement>(null);
  return (
    <label ref={switchLabel} className="switch-label" htmlFor={setting.id} title={`${setting.name} is ${setting.bool ? 'on' : 'off'}, click to turn ${setting.bool ? 'off' : 'on'}`}>
      <span>
        <b>
          {setting.name}
          :
        </b>
      </span>

      <input
        type="checkbox"
        role="switch"
        id={setting.id}
        checked={setting.bool}
        onChange={onInputChange}
        onFocus={() => {
          switchLabel.current?.classList.add('focused');
        }}
        onBlur={() => {
          switchLabel.current?.classList.remove('focused');
        }}
      />

      <span className="switch-label-right">
        <span className="switch-text" aria-hidden>
          {setting.bool ? 'On' : 'Off'}
        </span>
        <span className={`switch ${setting.bool && 'on'}`} />
      </span>
    </label>
  );
}
