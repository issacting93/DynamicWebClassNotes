// CORE REACT LIBRARY
import React from 'react'
// REACT DOM is for browser based projects
import ReactDOM from 'react-dom/client'

//import our App component so we can render it
import App from './App'

// import global style sheet for fonts and resets
import './global.css'

// grab a element by ID to assign as the root entry for our react project
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
