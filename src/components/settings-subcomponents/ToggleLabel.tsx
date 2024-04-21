import { type ChangeEvent, useRef } from 'react'

export default function ToggleLabel ({ setting, handleInput }: {
  setting: { id: string, name: string, checked: boolean }
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
}): JSX.Element {
  const switchLabel = useRef<HTMLLabelElement>(null)

  return (
    <label
      ref={switchLabel}
      className="switch-label"
      htmlFor={setting.id}
      title={`${setting.name} is ${setting.checked ? 'on' : 'off'}, click to turn ${setting.checked ? 'off' : 'on'}`}
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
        onChange={handleInput}
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
