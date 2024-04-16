import useClockSettings from './hooks/useClockSettings.ts'
import useNotifSettings from './hooks/useNotifSettings.ts'

import Clock from './components/Clock.tsx'
import Settings from './components/Settings.tsx'
import Footer from './components/Footer.tsx'

import playSound from './functions/playSound.ts'
import playNotification from './functions/playNotification.ts'

import 'hacktimer/HackTimer.min'

export default function App (): JSX.Element {
  const { clockSettings, setClockSettings } = useClockSettings()
  const { notifPermission, setNotifPermission, notifSupport } = useNotifSettings()

  function handleAlert (isHourly: boolean): void {
    if (clockSettings.soundEnabled) {
      playSound(clockSettings)
    }
    if (clockSettings.notifsEnabled) {
      playNotification(clockSettings, notifSupport, isHourly)
    }
  }

  return (
    <>
      <Clock
        clockSettings={clockSettings}
        onAlert={handleAlert}
        notifSupport={notifSupport}
      />
      <Settings
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
        notifPermission={notifPermission}
        setNotifPermission={setNotifPermission}
        notifSupport={notifSupport}
      />
      <Footer />
    </>
  )
}
