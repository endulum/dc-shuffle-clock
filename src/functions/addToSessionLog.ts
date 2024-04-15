import { type ITime, type ILogEvent } from '../types.ts'

export function addToSessionLog (anything: any, timestamp?: ITime): void {
  const log = getSessionLog()
  log.push({
    timestamp: timestamp ?? {
      minutes: (new Date().getMinutes()),
      seconds: (new Date().getSeconds())
    },
    message: anything instanceof Error && 'message' in anything
      ? `ERROR: ${anything.message}`
      : JSON.stringify(anything)
  })
  sessionStorage.setItem('logs', JSON.stringify(log))
}

export function getSessionLog (): ILogEvent[] {
  const sessionString = sessionStorage.getItem('logs')
  if (sessionString === null) {
    return initSessionLog()
  } // re-initialize the log if it's empty

  let sessionJSON: unknown
  try {
    sessionJSON = JSON.parse(sessionString)
  } catch {
    return initSessionLog()
  } // re-initialize the log if its data cant be parsed

  if (
    Array.isArray(sessionJSON) &&
      sessionJSON.every((value) => (
        typeof value.timestamp === 'object' &&
        'minutes' in value.timestamp &&
        'seconds' in value.timestamp &&
        typeof value.message === 'string'
      ))
  ) return sessionJSON
  // re-initialize the log if it doesn't actually look like a log
  return initSessionLog()
}

export function initSessionLog (): [] {
  sessionStorage.setItem('logs', JSON.stringify([]))
  return []
}
