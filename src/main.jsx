import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

// Layout variant: ?version=left | center (default center). Read from the query
// string (before the hash) so hash-based tab navigation preserves it; also
// accept it in the hash query as a fallback. The left overrides in styles.css
// key off [data-version="left"] on <html>.
const versionParam =
  new URLSearchParams(window.location.search).get('version') ||
  new URLSearchParams(window.location.hash.split('?')[1] || '').get('version')
document.documentElement.dataset.version =
  versionParam === 'left' ? 'left' : 'center'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
