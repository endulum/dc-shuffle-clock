import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import transformSettings from '../helpers/transformSettings.ts'
import defaultSettings from '../helpers/defaultSettings.ts'
import { type IClockSettings } from '../types.ts'

function deserializer (string: string): IClockSettings {
  try {
    const settingsJSON = JSON.parse(string)
    return transformSettings(settingsJSON)
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.warn('Error occurred when accessing stored settings. Using default settings...')
    return defaultSettings
  }
}

export default function useClockSettings (): {
  clockSettings: IClockSettings
  setClockSettings: Dispatch<SetStateAction<IClockSettings>>
} {
  const [clockSettings, setClockSettings] =
  useLocalStorage<IClockSettings>('settings', defaultSettings, {
    initializeWithValue: true,
    deserializer
  })

  // useEffect(() => {
  //   console.log(clockSettings)
  // }, [clockSettings])

  return { clockSettings, setClockSettings }
}
