import { App } from '@/app/App'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'

import './i18n/config'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
