import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-83609754-1')
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
