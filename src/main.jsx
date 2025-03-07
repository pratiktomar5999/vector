import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react';
import './index.css'
import ContextProvider from './Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App/>
  </ContextProvider>,
)
