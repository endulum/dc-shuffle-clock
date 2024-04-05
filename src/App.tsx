import useClockSettings from './hooks/useClockSettings.ts'

export default function App (): JSX.Element {
  const { clockSettings, setClockSettings } = useClockSettings()
  return (
    <div className="app">
      {/* <Clock /> */}
      {/* <DelayField /> */}
      {/* <SettingsFields /> */}
      {/* <Footer /> */}
    </div>
  )
}
