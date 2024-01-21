import { useEffect, useState } from 'react';

type Time = {
  minutes: number,
  seconds: number
}

export default function Clock({ onAlert, delay } : {
  onAlert: () => void,
  delay: number
}) {
  const [time, setTime] = useState<Time>({
    minutes: 0,
    seconds: 0,
  });

  function getTime() {
    const date = new Date();
    setTime({
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    });
  }

  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) getTime();
    }, 1000);
    return () => { clearInterval(interval); };
  });

  useEffect(() => {
    if (!paused && time.seconds === 60 - delay) {
      console.log(`sending alert on ${time.minutes}:${time.seconds}`);
      onAlert();
    }
  }, [time]);

  const handlePauseToggle = () => {
    setPaused(!paused);
    getTime();
  };

  return (
    <div>
      <p>
        Minutes:
        {' '}
        {time.minutes.toString().padStart(2, '0')}
      </p>
      <p>
        Seconds:
        {' '}
        {time.seconds.toString().padStart(2, '0')}
      </p>
      <button type="button" onClick={handlePauseToggle}>
        {paused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
}
