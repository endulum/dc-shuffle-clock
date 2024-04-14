import { type ITime, type ILogEvent } from '../types.ts'

export function addToSessionLog (timestamp: ITime, something: any): void {
  const log = getSessionLog()
  log.push({
    timestamp,
    message: JSON.stringify(something)
    // i don't care to format it nicely right now, i just want it as a string and readable
  })
  sessionStorage.setItem('logs', JSON.stringify(log))
}

export function getSessionLog (): ILogEvent[] {
  const sessionString = sessionStorage.getItem('logs')
  if (sessionString === null) initSessionLog()
  else {
    let sessionJSON: unknown
    try { sessionJSON = JSON.parse(sessionString) } catch { initSessionLog(); return [] }
    if (
      Array.isArray(sessionJSON) &&
      sessionJSON.every((value) => (
        'minutes' in value.timestamp &&
        'seconds' in value.timestamp &&
        typeof value.message === 'string'
      ))
    ) return sessionJSON
    initSessionLog()
  }
  return []
}

export function initSessionLog (): void {
  sessionStorage.setItem('logs', JSON.stringify([]))
}
