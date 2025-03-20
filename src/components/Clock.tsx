import { useEffect, useState } from 'react';
import { useDocumentTitle } from 'usehooks-ts';

import { Pause, PlayArrow, Loop } from '@mui/icons-material';

import { useClock } from '../hooks/useClock';
import * as messages from '../functions/serviceWorkerMessages';

const unloadEvent = async () => {
  await messages.pause();
};

export function Clock() {
  const [isAlerting, setIsAlerting] = useState<boolean>(false);

  const { time, isPaused, togglePause } = useClock({
    onPlay: async () => await messages.play(),
    onPause: async () => await messages.pause(),
    onAlert: (time) => {
      if (time.seconds % 10 === 0) {
        setIsAlerting(true);
        setTimeout(() => setIsAlerting(false), 2020);
      }
    },
  });

  useDocumentTitle(
    isPaused
      ? 'Cave Shuffle Clock'
      : `${4 - (time.minutes % 5)}:${(59 - time.seconds)
          .toString()
          .padStart(2, '0')} until next shuffle`
  );

  useEffect(() => {
    if (window) window.addEventListener('beforeunload', unloadEvent);
    return () => {
      if (window) window.addEventListener('beforeunload', unloadEvent);
    };
  }, []);

  return (
    <div className="clock flex-row aic jcc">
      <button
        type="button"
        className={`clock-button ${
          isAlerting ? 'alerting' : isPaused ? 'pausing' : 'playing'
        } p-05`}
        title={isPaused ? 'start the clock' : 'pause the clock'}
        aria-pressed={!isPaused}
        onClick={togglePause}
      >
        {isAlerting ? <Loop /> : isPaused ? <PlayArrow /> : <Pause />}
      </button>
      <span className="clock-digits" title="minutes of current time">
        {time.minutes.toString().padStart(2, '0')}
      </span>
      <span className="clock-digits" title="seconds of current time">
        {time.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
