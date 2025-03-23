import { useContext, useState } from 'react';
import { useDocumentTitle } from 'usehooks-ts';

import { Pause, PlayArrow, Loop } from '@mui/icons-material';

import { useClock } from '../hooks/useClock';
import { notify } from '../functions/notify';
import { AppContext } from '../AppContext';
import getAlertString from '../functions/getAlertString';
import { playSound } from '../functions/playSound';
import { useCustomAudio } from '../hooks/useCustomAudio';

export function Clock() {
  const { support, setSupport, clockSettings } = useContext(AppContext);
  const { customAudio } = useCustomAudio();
  const [isAlerting, setIsAlerting] = useState<boolean>(false);
  const { time, isPaused, togglePause } = useClock({
    onPause: () => {
      setIsAlerting(false);
    },
    onTick: async (time) => {
      const string = getAlertString(time, clockSettings);
      if (string) {
        setIsAlerting(true);
        setTimeout(() => setIsAlerting(false), 2020);
        if (clockSettings.notifsEnabled)
          await notify({
            string,
            support,
            setSupport,
            settings: clockSettings,
          });
        if (clockSettings.soundEnabled) playSound(clockSettings, customAudio);
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
