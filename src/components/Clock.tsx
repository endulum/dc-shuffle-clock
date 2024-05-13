import { useEffect, useRef } from 'react'
import { useDocumentTitle } from 'usehooks-ts'
import useClockTime from '../hooks/useClockTime.ts'
import { addToEventLog } from '../functions/addToEventLog.ts'
import workerPing from '../functions/workerPing.ts'
import { type IClockSettings, type TNotifTypes } from '../types.ts'

import PauseSvg from '../assets/pause.svg'
import PlaySvg from '../assets/play.svg'
import ShuffleSvg from '../assets/shuffle.svg'

export default function Clock ({ onAlert, clockSettings, notifSupport }: {
  onAlert: (isHourly: boolean) => void
  clockSettings: IClockSettings
  notifSupport: TNotifTypes
}): JSX.Element {
  const { time, isPaused, togglePause } = useClockTime()

  const playButton = useRef<HTMLButtonElement | null>(null)
  const playButtonImg = useRef<HTMLImageElement | null>(null)

  useDocumentTitle(
    isPaused
      ? 'Cave Shuffle Clock'
      : `${4 - (time.minutes % 5)}:${(59 - (time.seconds)).toString().padStart(2, '0')} until next shuffle`
  )

  function animateShuffle (): void {
    playButton.current?.classList.add('alerting')
    playButtonImg.current?.setAttribute('src', ShuffleSvg)
    setTimeout(() => {
      playButton.current?.classList.remove('alerting')
      playButtonImg.current?.setAttribute('src', isPaused ? PlaySvg : PauseSvg)
    }, 2000)
  }

  function doAlert (isHourly: boolean): void {
    onAlert(isHourly)
    addToEventLog('Alarm should go off')
    animateShuffle()
  }

  useEffect(() => {
    if (!isPaused) {
      if (time.minutes === 59) {
        if (
          !clockSettings.noHourly &&
          time.seconds === 60 - (clockSettings.useCustomHourlyDelay
            ? clockSettings.customHourlyDelay
            : clockSettings.delay)
        ) doAlert(true)
      } else if (
        (time.minutes + 1) % 5 === 0 &&
        time.seconds === 60 - clockSettings.delay
      ) {
        doAlert(false)
      }

      if (notifSupport === 'sworker' && time.seconds % 10 === 0) {
        addToEventLog('Checking if SWorker is awake')
        workerPing()
      }
    }
  }, [time])

  return (
    <div className="clock">
      <button
        type="button"
        ref={playButton}
        className={`clock-button ${isPaused ? 'pausing' : 'playing'}`}
        title="pause or play the clock"
        aria-pressed={!isPaused}
        onClick={togglePause}
      >
        <img
          ref={playButtonImg}
          className="button-svg white-svg"
          src={isPaused ? PlaySvg : PauseSvg}
          alt={isPaused ? 'the clock is paused' : 'the clock is running'}
        />
      </button>

      <span className="clock-minutes" title="minutes of current time">
        {time.minutes.toString().padStart(2, '0')}
      </span>
      <span className="clock-seconds" title="seconds of current time">
        {time.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}
