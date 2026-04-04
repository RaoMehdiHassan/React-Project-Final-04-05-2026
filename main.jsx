import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// create root
const root = ReactDOM.createRoot(document.getElementById('root'));

// render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);