import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// The self-contained preview build has no server to rewrite routes, so it uses
// hash routing. Deployed builds use clean paths.
//
// BrowserRouter needs `basename` to match Vite's `base` whenever the app is
// served from a subpath (the GitHub Pages preview, under
// /prestige-tutelage-website/) rather than domain root — otherwise <Link>
// generates root-relative hrefs that 404 under the subpath. BASE_URL is "/"
// for the real production build, where this is a no-op.
const isHash = import.meta.env.VITE_HASH_ROUTER === '1'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isHash ? (
      <HashRouter>
        <App />
      </HashRouter>
    ) : (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    )}
  </React.StrictMode>,
)
