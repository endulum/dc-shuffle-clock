import 'hacktimer/HackTimer.min';
import { Analytics } from '@vercel/analytics/react';

import { Clock } from './components/Clock';
import { Error } from './components/Error';
import { DelayManagement } from './components/DelayManagement';
import { SoundManagement } from './components/SoundManagement';
import { NotifManagement } from './components/NotifManagement';
import { Footer } from './components/Footer';

import { AppContextProvider } from './AppContext';

export default function App() {
  return (
    <>
      <AppContextProvider>
        <Clock />
        <Error />
        <main>
          <DelayManagement />
          <SoundManagement />
          <NotifManagement />
        </main>
        <Footer />
      </AppContextProvider>
      <Analytics />
    </>
  );
}
