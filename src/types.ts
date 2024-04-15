export interface IClockSettings {
  delay: number
  soundEnabled: boolean
  soundCustomChoice: boolean
  soundDefaultSelect: string
  soundCustomPath: string
  soundVolume: number
  notifsEnabled: boolean
  biomeEnabled: boolean
  biomeSelect: '1' | '2' | '3' | '4' | '5' | '6' | '7'
  biomeOpenType: 'tab' | 'window'
  notifAutoDismiss: boolean
}

export interface ITime {
  minutes: number
  seconds: number
}

export interface ILogEvent {
  timestamp: ITime
  message: string
}

export type TNotifPerms = 'pending' | 'allowed' | 'blocked' | 'unsupported'
export type TNotifTypes = null | 'sworker' | 'browser'
