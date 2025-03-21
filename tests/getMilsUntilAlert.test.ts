import { getMilsUntilAlert } from '../src/functions/getMilsUntilAlert';
import defaultSettings from '../src/functions/defaultSettings';

describe('determining miliseconds before next alert', () => {
  it('should handle shuffles', () => {
    const settings = { ...defaultSettings, delay: 15 };

    expect(
      getMilsUntilAlert({ time: { minutes: 2, seconds: 33 }, settings })
    ).toEqual(132 * 1000);
    expect(
      getMilsUntilAlert({ time: { minutes: 4, seconds: 5 }, settings })
    ).toEqual(40 * 1000);
    expect(
      getMilsUntilAlert({ time: { minutes: 5, seconds: 5 }, settings })
    ).toEqual(280 * 1000);
  });

  it('should handle hourlies', () => {
    let settings = { ...defaultSettings };
    expect(
      getMilsUntilAlert({ time: { minutes: 55, seconds: 12 }, settings })
    ).toEqual(273 * 1000);

    settings = { ...defaultSettings, noHourly: true };
    expect(
      getMilsUntilAlert({ time: { minutes: 55, seconds: 12 }, settings })
    ).toEqual(573 * 1000);

    settings = {
      ...defaultSettings,
      noHourly: false,
      useCustomHourlyDelay: true,
      customHourlyDelay: 5,
    };
    expect(
      getMilsUntilAlert({ time: { minutes: 55, seconds: 12 }, settings })
    ).toEqual(283 * 1000);

    settings = { ...defaultSettings };
    expect(
      getMilsUntilAlert({ time: { minutes: 0, seconds: 5 }, settings })
    ).toEqual(280 * 1000);

    settings = { ...defaultSettings, noHourly: true };
    expect(
      getMilsUntilAlert({ time: { minutes: 0, seconds: 5 }, settings })
    ).toEqual(280 * 1000);

    settings = {
      ...defaultSettings,
      useCustomHourlyDelay: true,
      customHourlyDelay: -10,
    };
    expect(
      getMilsUntilAlert({ time: { minutes: 0, seconds: 5 }, settings })
    ).toEqual(5 * 1000);
  });
});
