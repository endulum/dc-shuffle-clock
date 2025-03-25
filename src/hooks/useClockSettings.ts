import { type Dispatch, type SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import transformSettings from '../functions/transformSettings.ts';
import defaultSettings from '../functions/defaultSettings.ts';
import { type IClockSettings } from '../types.ts';

function deserializer(string: string): IClockSettings {
  try {
    const settingsJSON = JSON.parse(string);
    return transformSettings(settingsJSON);
  } catch (e: unknown) {
    console.error(e);
    console.warn(
      "Above error occurred when accessing stored settings. Don't worry, switching to default settings..."
    );
    return defaultSettings;
  }
}

export function useClockSettings(): {
  clockSettings: IClockSettings;
  setClockSettings: Dispatch<SetStateAction<IClockSettings>>;
} {
  const [clockSettings, setClockSettings] = useLocalStorage<IClockSettings>(
    'settings',
    defaultSettings,
    {
      initializeWithValue: true,
      deserializer,
    }
  );

  return { clockSettings, setClockSettings };
}
