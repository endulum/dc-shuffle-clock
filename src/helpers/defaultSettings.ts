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

export default defaultSettings
