import { useState } from 'react'
import useClockSettings from './hooks/useClockSettings.ts'
import notifSupportInitializer from './helpers/notifUtils.ts'
import SettingsFields from './components/SettingsFields.tsx'

export default function App (): JSX.Element {
  const { clockSettings, setClockSettings } = useClockSettings()
  const [notifSupport, setNotifSupport] = useState<string>(notifSupportInitializer)

  return (
    <div className="app">

      {/* <Clock /> */}
      {/* <DelayField /> */}
      <SettingsFields
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
        notifSupport={notifSupport}
        setNotifSupport={setNotifSupport}
      />
      {/* <Footer /> */}
    </div>
  )
}
