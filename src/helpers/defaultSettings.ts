import { type IClockSettings } from '../types.ts'

const defaultSettings: IClockSettings = {
  delay: 15,
  noDelayOnHourly: false,
  noHourly: false,
  soundEnabled: false,
  soundCustomChoice: false,
  soundCustomTitle: '',
  soundDefaultSelect: 'SMS Alert 1',
  soundVolume: 50,
  notifsEnabled: false,
  biomeEnabled: false,
  biomeSelect: '5',
  biomeOpenType: 'window',
  notifAutoDismiss: false
}

export default defaultSettings
