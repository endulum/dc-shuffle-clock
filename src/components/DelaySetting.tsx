import { ChangeEvent } from 'react';

export default function DelaySetting({ delay, onInputChange }:{
  delay: number,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="delay-label" htmlFor="delay">
      Warn me
      {' '}
      <input
        type="number"
        value={delay}
        min="1"
        max="60"
        id="delay"
        className="input-delay"
        onChange={onInputChange}
        // the accessibility tree (mozilla) currently reads this as:
        // "Warn me 10 seconds before each shuffle."
        // with the aria-label "delay in seconds" it reads:
        // "Warn me delay in seconds 10 seconds before each shuffle."
        // so perhaps an aria-label is redundant here?
      />
      {' '}
      seconds before each shuffle.
    </label>
  );
}
