import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// The self-contained preview build has no server to rewrite routes, so it uses
// hash routing. Deployed builds use clean paths. GitHub Pages is hosted under
// the repository base path, so BrowserRouter receives that basename.
const useHashRouter = import.meta.env.VITE_HASH_ROUTER === '1'
const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {useHashRouter ? (
      <HashRouter>
        <App />
      </HashRouter>
    ) : (
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    )}
  </React.StrictMode>,
)
