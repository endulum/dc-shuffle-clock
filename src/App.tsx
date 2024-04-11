import { useState } from 'react'
import useClockSettings from './hooks/useClockSettings.ts'
import { notifSupportInitializer } from './helpers/notifUtils.ts'
import addToSessionLog from './helpers/addToSessionLog.ts'
import { type Time } from './types.ts'

import 'hacktimer/HackTimer.min'

import SettingsFields from './components/SettingsFields.tsx'
import Clock from './components/Clock.tsx'
import DelayField from './components/DelayField.tsx'
import Footer from './components/Footer.tsx'

import playSound from './helpers/playSound.ts'
import doNotify from './helpers/doNotify.ts'

export default function App (): JSX.Element {
  const { clockSettings, setClockSettings } = useClockSettings()
  const [notifSupport, setNotifSupport] = useState<string>(notifSupportInitializer)

  function handleAlert (time: Time): void {
    if (clockSettings.soundEnabled) {
      playSound(clockSettings)
    }
    if (clockSettings.notifsEnabled) {
      doNotify(clockSettings, time.minutes === 59)
    }

    addToSessionLog(`Alarm went off at ${
      time.minutes.toString().padStart(2, '0')
    }:${
      time.seconds.toString().padStart(2, '0')
    }`)
  }

  return (
    <>
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
      <Footer />
    </>
  )
}
