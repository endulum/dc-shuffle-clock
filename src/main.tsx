import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal'
import App from './App.tsx'
import './style.css'

const root = document.getElementById('root')

if (root !== null) {
  Modal.setAppElement('#root')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
