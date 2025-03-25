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
  return (
    <div className="setting g-05">
      {buttonComponent}
      {switchComponent}
      <div className={`setting-body-wrapper${settingBool ? ' open' : ''}`}>
        <div className="setting-body">{children}</div>
      </div>
    </div>
  );
}
