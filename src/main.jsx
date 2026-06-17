import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Global fetch interceptor to prepend VITE_API_URL for all relative /api requests
const originalFetch = window.fetch;
window.fetch = function (url, options) {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  if (typeof url === 'string' && url.startsWith('/api')) {
    url = `${apiUrl}${url}`;
  }
  return originalFetch(url, options);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
