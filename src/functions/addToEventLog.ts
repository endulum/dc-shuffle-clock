import { DateTime } from 'luxon'

import { type ILogEvent } from '../types.ts'

export function addToEventLog (anything: any): void {
  const log = getEventLog()
  log.push({
    timestamp: DateTime.local().toLocaleString({
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }),
    message: anything instanceof Error && 'message' in anything
      ? `ERROR: ${anything.message}`
      : JSON.stringify(anything)
  })
  sessionStorage.setItem('logs', JSON.stringify(log))
}

export function getEventLog (): ILogEvent[] {
  const sessionString = sessionStorage.getItem('logs')
  if (sessionString === null) {
    return initEventLog()
  } // re-initialize the log if it's empty

  let sessionJSON: unknown
  try {
    sessionJSON = JSON.parse(sessionString)
  } catch {
    return initEventLog()
  } // re-initialize the log if its data cant be parsed

  if (
    Array.isArray(sessionJSON) &&
      sessionJSON.every((value) => (
        typeof value.timestamp === 'string' &&
        typeof value.message === 'string'
      ))
  ) return sessionJSON
  // re-initialize the log if it doesn't actually look like a log
  return initEventLog()
}

export function initEventLog (): [] {
  sessionStorage.setItem('logs', JSON.stringify([]))
  return []
}
