import { useRef } from 'react';

export function SettingBody({
  settingBool,
  buttonComponent,
  switchComponent,
  children,
}: {
  settingBool: boolean;
  buttonComponent: React.ReactNode;
  switchComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  if (bodyRef.current !== null) {
    bodyRef.current.querySelectorAll('input, select').forEach((child) => {
      if (settingBool) child.removeAttribute('tabindex');
      else child.setAttribute('tabindex', '-1');
    });
  }

  return (
    <div className="setting g-05">
      {buttonComponent}
      {switchComponent}
      <div
        className="setting-body"
        ref={bodyRef}
        style={
          settingBool && bodyRef.current !== null
            ? { height: bodyRef.current.scrollHeight }
            : {
                height: 0,
                pointerEvents: 'none',
              }
        }
      >
        {children}
      </div>
    </div>
  );
}
