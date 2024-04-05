import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'

import { type IClockSettings } from '../types.ts'

const defaultSettings: IClockSettings = {
  delay: 15,
  soundEnabled: false,
  soundSelect: 'SMS Alert 1',
  soundVolume: 50,
  notifsEnabled: false,
  biomeEnabled: false,
  biomeSelect: '5',
  biomeOpenType: 'window',
  notifAutoDismiss: false
}

export default function useClockSettings (): {
  clockSettings: IClockSettings | null
  setClockSettings: Dispatch<SetStateAction<IClockSettings | null>>
} {
  const [clockSettings, setClockSettings] = useState<IClockSettings | null>(null)

  function getStoredSettings (): void {
    const settingsData = localStorage.getItem('settings')
    if (settingsData !== null) {
      try {
        const settingsJSON = JSON.parse(settingsData)
        setClockSettings(settingsJSON as IClockSettings)
      } catch (e: unknown) {
        // eslint-disable-next-line no-console
        console.warn('Error occurred when accessing stored settings. Using default settings...')
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn('No stored settings found. Using default settings...')
      setClockSettings(defaultSettings)
    }
  }

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(clockSettings))
  }, [clockSettings])

  useEffect(() => {
    getStoredSettings()
  }, [])

  return { clockSettings, setClockSettings }
}
