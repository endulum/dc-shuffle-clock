import { createContext, type ChangeEvent } from 'react';

import { IClockSettings } from './types';
import { useClockSettings } from './hooks/useClockSettings';

const AppContext = createContext(
  {} as {
    clockSettings: IClockSettings;
    handleInput: <T extends ChangeEvent<HTMLInputElement | HTMLSelectElement>>(
      event: T
    ) => void;
  }
);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { clockSettings, setClockSettings } = useClockSettings();

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
    <AppContext.Provider value={{ clockSettings, handleInput }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
