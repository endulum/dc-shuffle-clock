import { type ChangeEvent, useRef } from 'react'

export default function ToggleLabel ({ setting, onInputChange }: {
  setting: { id: string, name: string, checked: boolean }
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}): JSX.Element {
  const switchLabel = useRef<HTMLLabelElement>(null)

  return (
    <label
      ref={switchLabel}
      className="switch-label"
      htmlFor={setting.id}
      title={`${setting.name} is ${setting.checked ? 'on' : 'off'}, click to turn ${setting.checked ? 'off' : 'on'}`}
      onMouseEnter={() => {
        switchLabel.current?.classList.add('focused')
      }}
      onMouseLeave={() => {
        switchLabel.current?.classList.remove('focused')
      }}
    >
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
        checked={setting.checked}
        onChange={onInputChange}
        onFocus={() => {
          switchLabel.current?.classList.add('focused')
        }}
        onBlur={() => {
          switchLabel.current?.classList.remove('focused')
        }}
      />

      <span className="switch-label-right">
        <span className="switch-text" aria-hidden>
          {setting.checked ? 'On' : 'Off'}
        </span>
        <span className={`switch ${setting.checked && 'on'}`} />
      </span>
    </label>
  )
}
