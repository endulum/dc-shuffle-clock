export interface Settings {
  delay: number,
  soundEnabled: boolean,
  notifsEnabled: boolean
}

export type NotifSupport = 'allowed' | 'pending' | 'blocked' | 'unsupported'
