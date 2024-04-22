import { useRef } from 'react'

export default function SettingBody (
  { isVisible, children }: {
    isVisible: boolean
    children: JSX.Element
  }
): JSX.Element {
  const bodyRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      className="setting-body"
      ref={bodyRef}
      style={
        isVisible && bodyRef.current !== null
          ? {
              height: bodyRef.current.scrollHeight
            }
          : { height: 0 }
      }
    >
      {children}
    </div>
  )
}
