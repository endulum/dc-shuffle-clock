import { createContext, type ChangeEvent } from 'react';

import { IClockSettings, TNotifPerms, TNotifTypes } from './types';
import { useClockSettings } from './hooks/useClockSettings';
import { useNotifState } from './hooks/useNotifState';

const AppContext = createContext(
  {} as {
    // settings
    clockSettings: IClockSettings;
    handleInput: <T extends ChangeEvent<HTMLInputElement | HTMLSelectElement>>(
      event: T
    ) => void;
    // notifs
    permission: TNotifPerms;
    askPermission: () => Promise<void>;
    support: TNotifTypes;
    setSupport: React.Dispatch<React.SetStateAction<TNotifTypes>>;
  }
);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { clockSettings, setClockSettings } = useClockSettings();
  const { permission, askPermission, support, setSupport } = useNotifState();

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
        handleInput,
        permission,
        askPermission,
        support,
        setSupport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
