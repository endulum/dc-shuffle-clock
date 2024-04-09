import { useState, useEffect } from 'react'

interface Time {
  minutes: number
  seconds: number
}

export default function useClockTime (): {
  time: Time
  isPaused: boolean
  togglePause: () => void
} {
  const [time, setTime] = useState<Time>({ minutes: 0, seconds: 0 })
  const [isPaused, setIsPaused] = useState<boolean>(true)

  function getTimeNow (): void {
    const date = new Date()
    setTime({
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    })
  }

  function togglePause (): void {
    setIsPaused(!isPaused)
    getTimeNow()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) getTimeNow()
    // should this interval be lower for more accuracy / less risk of a dropped tick?
    }, 1000)
    return () => { clearInterval(interval) }
  })

  return { time, isPaused, togglePause }
}
