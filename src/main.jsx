import { StrictMode } from 'react'
import React from 'react'

// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
// import React Router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Redux Store
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter basename='/'>
  

      <App />
    
    </BrowserRouter>
  </React.StrictMode>
    </Provider>
)
