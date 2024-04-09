import { useState } from 'react'
import useClockSettings from './hooks/useClockSettings.ts'
import { notifSupportInitializer } from './helpers/notifUtils.ts'
import SettingsFields from './components/SettingsFields.tsx'
import Clock from './components/Clock.tsx'
import DelayField from './components/DelayField.tsx'
import playSound from './helpers/playSound.ts'
import doNotify from './helpers/doNotify.ts'
import 'hacktimer/HackTimer.min'

export default function App (): JSX.Element {
  const { clockSettings, setClockSettings } = useClockSettings()
  const [notifSupport, setNotifSupport] = useState<string>(notifSupportInitializer)

  function handleAlert (isHourly: boolean): void {
    if (clockSettings.soundEnabled) {
      playSound(clockSettings)
    }
    if (clockSettings.notifsEnabled) {
      doNotify(clockSettings, isHourly)
    }
  }

  return (
    <div className="app">

      <Clock
        delay={clockSettings.delay}
        onAlert={handleAlert}
      />
      <DelayField
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
      />
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
