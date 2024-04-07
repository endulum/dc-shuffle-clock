export interface IClockSettings {
  delay: number
  soundEnabled: boolean
  soundCustomChoice: boolean
  soundDefaultSelect: string
  soundCustomPath: string
  // soundSelectType: string
  // soundDefaultChoice: string
  // soundCustomPath: string
  soundVolume: number
  notifsEnabled: boolean
  biomeEnabled: boolean
  biomeSelect: '1' | '2' | '3' | '4' | '5' | '6' | '7'
  biomeOpenType: 'tab' | 'window'
  notifAutoDismiss: boolean
}
