import { useEffect, useState, useRef } from 'react';

import PauseSvg from '../assets/pause.svg';
import PlaySvg from '../assets/play.svg';
import ShuffleSvg from '../assets/shuffle.svg';

type Time = {
  minutes: number,
  seconds: number
}

export default function Clock({ onAlert, delay } : {
  onAlert: () => void,
  delay: number
}) {
  const [time, setTime] = useState<Time>({ minutes: 0, seconds: 0 });
  const [paused, setPaused] = useState<boolean>(true);
  const playButton = useRef<HTMLButtonElement | null>(null);
  const playButtonImg = useRef<HTMLImageElement | null>(null);

  function getTime(): void {
    const date = new Date();
    setTime({
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    });
  }

  function handlePauseToggle(): void {
    setPaused(!paused);
    getTime();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) getTime();
    }, 1000);
    return () => { clearInterval(interval); };
  });

  useEffect(() => {
    // if (!paused && time.seconds % 5 === 0) {
    if (!paused && time.seconds === 60 - delay) {
      console.log(`sending alert on ${time.minutes}:${time.seconds}`); // for debugging

      // the shuffle animation did have its own state but
      // giving it state made the clock skip seconds whenever
      // the shuffle occurred. it's cleaner - and less re-renders -
      // to keep the shuffle animation to some dom reffing
      playButton.current?.classList.add('alerting');
      playButtonImg.current?.setAttribute('src', ShuffleSvg);
      setTimeout(() => {
        playButton.current?.classList.remove('alerting');
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        playButtonImg.current?.setAttribute('src', paused ? PlaySvg : PauseSvg);
        // issue: ofc this whole condition runs when !paused. but how can i
        // get this setTimeout to check the value of paused AFTER the timeout?
        // currently, paused is always falsy because of the condition it runs in.
      }, 2000);

      onAlert();
    }
  }, [time]);

  return (
    <div className="clock">
      <button
        type="button"
        ref={playButton}
        className={`clock-button ${paused ? 'pausing' : 'playing'}`}
        title="pause or play the clock"
        aria-pressed={!paused}
        onClick={handlePauseToggle}
      >
        <img
          ref={playButtonImg}
          className="clock-button-svg white"
          src={paused ? PlaySvg : PauseSvg}
          alt={paused ? 'the clock is paused' : 'the clock is running'}
        />
      </button>

      <span className="clock-minutes" title="minutes of current time">
        {time.minutes.toString().padStart(2, '0')}
      </span>
      <span className="clock-seconds" title="seconds of current time">
        {time.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
