import { useRef } from 'react'

export default function SettingBody (
  { isVisible, children }: {
    isVisible: boolean
    children: JSX.Element
  }
): JSX.Element {
  const bodyRef = useRef<HTMLDivElement | null>(null)

  if (bodyRef.current !== null) {
    bodyRef.current.querySelectorAll('input, select').forEach((child) => {
      if (isVisible) child.removeAttribute('tabindex')
      else child.setAttribute('tabindex', '-1')
    })
  }

  return (
    <div
      className="setting-body"
      ref={bodyRef}
      aria-hidden={!isVisible}
      style={
        isVisible && bodyRef.current !== null
          ? { height: bodyRef.current.scrollHeight }
          : { height: 0, pointerEvents: 'none' }
      }
    >
      {children}
    </div>
  )
}
