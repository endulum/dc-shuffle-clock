import { useState, createContext, type ChangeEvent } from 'react';

import {
  type IClockSettings,
  type TNotifPerms,
  type TNotifTypes,
} from './types';
import { useClockSettings } from './hooks/useClockSettings';
import { useNotifState } from './hooks/useNotifState';

type Error = {
  type: string;
  message: string;
};

const AppContext = createContext(
  {} as {
    // settings
    clockSettings: IClockSettings;
    setClockSettings: React.Dispatch<React.SetStateAction<IClockSettings>>;
    handleInput: <T extends ChangeEvent<HTMLInputElement | HTMLSelectElement>>(
      event: T
    ) => void;
    // notifs
    permission: TNotifPerms;
    askPermission: () => Promise<void>;
    support: TNotifTypes;
    setSupport: React.Dispatch<React.SetStateAction<TNotifTypes>>;
    error: Error | null;
    setError: React.Dispatch<React.SetStateAction<Error | null>>;
  }
);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { clockSettings, setClockSettings } = useClockSettings();
  const { permission, askPermission, support, setSupport } = useNotifState();
  const [error, setError] = useState<Error | null>(null);

  function handleInput<
    T extends ChangeEvent<HTMLInputElement | HTMLSelectElement>
  >(event: T): void {
    switch (event.target.type) {
      case 'checkbox':
        if ('checked' in event.target) {
          setClockSettings({
            ...clockSettings,
            [event.target.id]: event.target.checked,
          });
        }
        break;
      case 'range':
        setClockSettings({
          ...clockSettings,
          [event.target.id]: parseInt(event.target.value, 10),
        });
        break;
      case 'number':
        setClockSettings({
          ...clockSettings,
          [event.target.id]: parseInt(event.target.value, 10),
        });
        break;
      default:
        setClockSettings({
          ...clockSettings,
          [event.target.id]: event.target.value,
        });
    }
  }

  return (
    <AppContext.Provider
      value={{
        clockSettings,
        setClockSettings,
        handleInput,
        permission,
        askPermission,
        support,
        setSupport,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
