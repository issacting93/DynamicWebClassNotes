// Core react library
import React from 'react';
//React DOM library is for browser based projects

import ReactDOM from 'react-dom/client';
// Import our App component
import App from './App';

// Create a root element by grabbing the root element from the index.html file

// Import our global.css file
import './global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);