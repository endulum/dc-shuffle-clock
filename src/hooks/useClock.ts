import { useState, useEffect } from 'react';

import { useLogger } from './useLogger.ts';
import { type ITime } from '../types.ts';

export function useClock(alert: (time: ITime) => void): {
  time: ITime;
  isPaused: boolean;
  togglePause: () => void;
} {
  const [time, setTime] = useState<ITime>({ minutes: 0, seconds: 0 });
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useLogger({ time: JSON.stringify(time), isPaused });

  function getTimeNow(): void {
    const date = new Date();
    const time = {
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
    setTime(time);
    if (!isPaused) alert(time);
  }

  function togglePause(): void {
    setIsPaused(!isPaused);
    getTimeNow();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) getTimeNow();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return { time, isPaused, togglePause };
}
