import { type ChangeEvent } from 'react'
import useClockSettings from './hooks/useClockSettings.ts'

import SettingsFields from './components/SettingsFields.tsx'

export default function App (): JSX.Element {
  const { clockSettings, setClockSettings } = useClockSettings()

  return (
    <div className="app">

      {/* <Clock /> */}
      {/* <DelayField /> */}
      <SettingsFields
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
      />
      {/* <Footer /> */}
    </div>
  )
}
