export default function addToSessionLog (logString: string): void {
  const log = getSessionLog()
  log.push(logString)
  sessionStorage.setItem('logs', JSON.stringify(log))
}

function getSessionLog (): string[] {
  const sessionString = sessionStorage.getItem('logs')
  if (sessionString === null) initSessionLog()
  else {
    let sessionJSON: unknown
    try { sessionJSON = JSON.parse(sessionString) } catch { initSessionLog(); return [] }
    if (
      Array.isArray(sessionJSON) &&
      sessionJSON.every((value) => typeof value === 'string')
    ) return sessionJSON
    initSessionLog()
  }
  return []
}

function initSessionLog (): void {
  sessionStorage.setItem('logs', JSON.stringify([]))
}
