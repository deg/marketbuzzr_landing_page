import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

// Layout variant: ?version=mixed | center | left (default mixed). Read from the
// query string (before the hash) so hash-based tab navigation preserves it;
// also accept it in the hash query as a fallback. styles.css keys variant
// overrides off [data-version="..."] on <html>; "center" is the unscoped base.
const versionParam =
  new URLSearchParams(window.location.search).get('version') ||
  new URLSearchParams(window.location.hash.split('?')[1] || '').get('version')
const VERSIONS = ['mixed', 'center', 'left']
document.documentElement.dataset.version = VERSIONS.includes(versionParam)
  ? versionParam
  : 'mixed'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
