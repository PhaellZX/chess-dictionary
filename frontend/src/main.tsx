// Em frontend/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // Importe

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Adicione o BrowserRouter aqui */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)