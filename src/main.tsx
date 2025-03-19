import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './assets/styles/reset.css';
import './assets/styles/utility.css';
import './assets/styles/main.css';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
