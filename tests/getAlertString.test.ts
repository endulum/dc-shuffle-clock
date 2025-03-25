import doAlert from '../src/functions/getAlertString.ts';
import defaultSettings from '../src/functions/defaultSettings.ts';

const time = {
  minutes: 4,
  seconds: 45,
};

const settings = {
  ...defaultSettings,
  delay: 15,
  noHourly: false,
  useCustomHorurlyDelay: false,
  customHourlyDelay: 5,
};

describe('correct alert string', () => {
  test('test defaults allow string return (regular)', () => {
    expect(doAlert(time, settings)).toEqual(
      `The next cave refresh will occur in ${settings.delay} seconds.`
    );
  });

  test('test defaults allow string return (hourly)', () => {
    expect(doAlert({ ...time, minutes: 59 }, settings)).toEqual(
      `The site hourly will occur in about ${settings.delay} seconds.`
    );
  });

  test('no string return if hourly and noHourly is true', () => {
    expect(
      doAlert({ ...time, minutes: 59 }, { ...settings, noHourly: true })
    ).toBeNull();
  });

  test('use the custom hourly delay if useCustomHourlyDelay is true', () => {
    expect(
      doAlert(
        { ...time, minutes: 59 },
        { ...settings, useCustomHourlyDelay: true }
      )
    ).toBeNull();

    expect(
      doAlert(
        { minutes: 59, seconds: 60 - settings.customHourlyDelay },
        { ...settings, useCustomHourlyDelay: true }
      )
    ).toEqual(
      `The site hourly will occur in about ${settings.customHourlyDelay} seconds.`
    );
  });

  test('different string for if customHourlyDelay is 0', () => {
    expect(
      doAlert(
        { minutes: 0, seconds: 0 },
        { ...settings, useCustomHourlyDelay: true, customHourlyDelay: 0 }
      )
    ).toEqual('The site hourly happened 0 seconds ago.');
  });

  test('different string for if customHourlyDelay is negative', () => {
    expect(
      doAlert(
        { minutes: 0, seconds: 15 },
        { ...settings, useCustomHourlyDelay: true, customHourlyDelay: -15 }
      )
    ).toEqual('The site hourly happened 15 seconds ago.');
  });
});
