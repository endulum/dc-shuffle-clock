import defaults from './defaultSettings.ts';
import type { IClockSettings } from '../types';

type keyable = Record<string, unknown>;

export default function transformSettings(data: unknown): IClockSettings {
  if (data === null || typeof data !== 'object') return defaults;

  const transformedSettings: keyable = { ...defaults };

  Object.keys(transformedSettings).forEach((setting) => {
    if (
      setting in data &&
      typeof (data as keyable)[setting] ===
        typeof defaults[setting as keyof IClockSettings]
    ) {
      transformedSettings[setting as keyof IClockSettings] = (data as keyable)[
        setting
      ];
    }
  });

  return transformedSettings as unknown as IClockSettings;
}
