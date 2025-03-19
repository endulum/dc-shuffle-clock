import defaults from './defaultSettings.ts';
import type { IClockSettings } from '../types';

type keyable = Record<string, unknown>;

export default function transformSettings(data: unknown): IClockSettings {
  if (data === null || typeof data !== 'object') return defaults;

  const transformedSettings: keyable = {};

  Object.keys(defaults).forEach((setting) => {
    if (
      // setting is not defined in data
      (data as keyable)[setting] === undefined ||
      // setting is the wrong type in data
      typeof (data as keyable)[setting] !==
        typeof defaults[setting as keyof IClockSettings]
    ) {
      // use the default value of this setting instead of data's value
      transformedSettings[setting] = defaults[setting as keyof IClockSettings];
    } else {
      // if everything's ok, use data's value for this setting
      transformedSettings[setting] = (data as keyable)[setting];
    }
  });

  return transformedSettings as unknown as IClockSettings;
}
