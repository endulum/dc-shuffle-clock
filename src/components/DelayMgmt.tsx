import { useContext } from 'react';

import { AppContext } from '../AppContext';

export function DelayMgmt() {
  const { clockSettings, handleInput } = useContext(AppContext);
  return (
    <div className="flex-col">
      <label htmlFor="delay" className="flex-row jcspb w100">
        <b>Delay:</b>
        <span>
          <input
            id="delay"
            type="number"
            min="1"
            max="59"
            title="delay in seconds"
            defaultValue={clockSettings.delay}
            onChange={handleInput}
          />
          &nbsp; seconds before shuffle
        </span>
      </label>

      <div className="setting-body w100 mt-05">
        <div
          className={`flex-col ais g-25 w100${
            clockSettings.noHourly ? ' disabled' : ''
          }`}
        >
          <div className="flex-row jcs g-05 w100">
            <input
              type="checkbox"
              id="useCustomHourlyDelay"
              defaultChecked={clockSettings.useCustomHourlyDelay}
              onChange={handleInput}
              disabled={clockSettings.noHourly}
            />
            <label htmlFor="useCustomHourlyDelay">
              Use custom delay for hourlies
            </label>
          </div>
          <div className="flex-row jcs w100">
            <label
              htmlFor="customHourlyDelay"
              {...(!clockSettings.useCustomHourlyDelay && {
                className: 'disabled',
              })}
            >
              <small>
                Warn me&nbsp;
                <input
                  type="number"
                  id="customHourlyDelay"
                  min={-59}
                  max={59}
                  defaultValue={clockSettings.customHourlyDelay}
                  onChange={handleInput}
                  title="hourly delay in seconds"
                  disabled={
                    !clockSettings.useCustomHourlyDelay ||
                    clockSettings.noHourly
                  }
                />
                &nbsp;seconds before each hourly
              </small>
            </label>
          </div>
        </div>

        <div className="flex-row jcs g-05 w100">
          <input
            type="checkbox"
            id="noHourly"
            defaultChecked={clockSettings.noHourly}
            onChange={handleInput}
          />
          <label htmlFor="noHourly">
            Skip hourlies, do not warn me at all for them
          </label>
        </div>
      </div>
    </div>
  );
}
