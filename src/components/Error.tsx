import { useContext, useEffect } from 'react';
import { Close } from '@mui/icons-material';

import { AppContext } from '../AppContext';

type Error = {
  type: string;
  message: string;
};

export function Error() {
  const { error, setError } = useContext(AppContext);

  useEffect(() => {
    // listen for errors from the service worker too
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener('message', (event): void => {
        if (
          event.data &&
          event.data.type === 'error' &&
          'error' in event.data
        ) {
          setError({
            type: 'Error with Service Worker',
            message: event.data.error,
          });
        }
      });
    }
  }, []);

  if (error)
    return (
      <div className="error flex-row ais g-05 p-05 w100">
        <button
          onClick={() => {
            setError(null);
          }}
          title="Dismiss this error"
        >
          <Close />
        </button>
        <p className="flg">
          <b>{error.type}:</b>
          &nbsp;
          {error.message}
        </p>
      </div>
    );
}
