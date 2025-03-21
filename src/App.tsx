import { Clock } from './components/Clock';
import { DelayMgmt } from './components/DelayMgmt';
import { SoundMgmt } from './components/SoundMgmt';
import { NotifMgmt } from './components/NotifMgmt';
import { Footer } from './components/Footer';

import { SettingsContextProvider } from './SettingsContext';

export default function App() {
  return (
    <>
      <SettingsContextProvider>
        <Clock />
        <main>
          <DelayMgmt />
          <SoundMgmt />
          <NotifMgmt />
        </main>
        <Footer />
      </SettingsContextProvider>
    </>
  );
}

/* import useClockSettings from './hooks/useClockSettings.ts'
import useNotifSettings from './hooks/useNotifSettings.ts'
import useCustomAudio from './hooks/useCustomAudio.ts'

import Clock from './components/Clock.tsx'
import Settings from './components/Settings.tsx'
import Footer from './components/Footer.tsx'

import playSound from './functions/playSound.ts'
import playNotification from './functions/playNotification.ts'

import 'hacktimer/HackTimer.min'
import { type IClockSettings, type TNotifPerms } from './types.ts'

export default function App (): JSX.Element {
  const {
    clockSettings, setClockSettings
  } = useClockSettings()
  const {
    customAudio, initCustomAudio
  } = useCustomAudio()
  const {
    notifPermission, setNotifPermission, notifSupport
  } = useNotifSettings()

  function handleAlert (alertString: string): void {
    if (clockSettings.soundEnabled) {
      playSound(clockSettings, customAudio ?? undefined)
    }
    if (clockSettings.notifsEnabled) {
      playNotification(clockSettings, notifSupport, alertString)
    }
  }

  const testSound = (): void => {
    playSound(clockSettings, customAudio ?? undefined)
  }

  const testNotification = (): void => {
    playNotification(clockSettings, notifSupport, 'This is a test notification.')
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
        setClockSettings={
          (newSettings: IClockSettings) => { setClockSettings(newSettings) }
        }
        testSound={testSound}
        testNotification={testNotification}
        notifPermission={notifPermission}
        setNotifPermission={
          (permission: TNotifPerms) => { setNotifPermission(permission) }
        }
        notifSupport={notifSupport}
        initCustomAudio={initCustomAudio}
      />
      <Footer />
    </>
  )
}
 */
