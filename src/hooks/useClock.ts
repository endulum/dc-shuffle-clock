import { useState, useEffect } from 'react';

import { type ITime } from '../types.ts';

export function useClock({
  onPlay,
  onPause,
  onAlert,
}: {
  onPlay: () => void;
  onPause: () => void;
  onAlert: (time: ITime) => void;
}): {
  time: ITime;
  isPaused: boolean;
  togglePause: () => void;
} {
  const [time, setTime] = useState<ITime>({ minutes: 0, seconds: 0 });
  const [isPaused, setIsPaused] = useState<boolean>(true);

  function getTimeNow(): void {
    const date = new Date();
    const time = {
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
    setTime(time);
    if (!isPaused) onAlert(time);
  }

  function togglePause(): void {
    if (isPaused) onPlay();
    else onPause();

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
