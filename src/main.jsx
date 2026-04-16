import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './i18n/config.js'

// Set initial lang/dir from localStorage before render
const savedLang = localStorage.getItem('portfolio-lang')
const lang = savedLang ? savedLang : 'en'
document.documentElement.lang = lang
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
