import { useEffect, useState } from 'react'
import CustomModal from './CustomModal.tsx'
import { getSessionLog, initSessionLog } from '../../functions/addToSessionLog.ts'
import { type ILogEvent } from '../../types.ts'
import LogSvg from '../../assets/file-pen-solid.svg'

export default function AlertLogModal (): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  return (
    <>
      <button
        type="button"
        className="plain-button"
        title="Open Alert Log"
        onClick={() => { setModalOpen(true) }}
      >
        <img
          src={LogSvg}
          alt="alert log"
          className="footer-svg white-svg"
          aria-hidden
        />
      </button>
      <CustomModal
        contentLabel="Alert Log"
        isOpen={modalOpen}
        closeModal={() => { setModalOpen(false) }}
      >
        <AlertLog />
      </CustomModal>
    </>
  )
}

function AlertLog (): JSX.Element {
  const [logs, setLogs] = useState<ILogEvent[] | null>(null)

  function getLogs (): void {
    setLogs(getSessionLog())
  }

  useEffect(() => {
    getLogs()
  }, [])
  return logs === null
    ? <p>Getting logs...</p>
    : (
      <>
        <div className="alertlog">
          {logs.map((log, index) => (
            <p className="alertlog-msg" key={log.message.concat(index.toString())}>
              <b>
                {log.timestamp.minutes.toString().padStart(2, '0')}
                :
                {log.timestamp.seconds.toString().padStart(2, '0')}
              </b>
              {' '}
              <span>{log.message}</span>
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            initSessionLog()
            getLogs()
          }}
        >
          Reset Log
        </button>
      </>

      )
}
