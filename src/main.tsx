import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import App from './App.tsx';

import './assets/styles/reset.css';
import './assets/styles/utility.css';
import './assets/styles/main.css';

const root = document.getElementById('root');

if (root !== null) {
  Modal.setAppElement('#root');
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
