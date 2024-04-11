import { useEffect, useState } from 'react'
import CustomModal from './CustomModal.tsx'
import { getSessionLog, initSessionLog } from '../helpers/addToSessionLog.ts'
import LogSvg from '../assets/file-pen-solid.svg'

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
  const [logs, setLogs] = useState<string[] | null>(null)

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
          {logs.map((log) => <p className="alertlog-msg" key={log}>{log}</p>)}
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
