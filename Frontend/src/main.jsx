import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // <-- importa BrowserRouter
import { CompareProvider } from './context/CompareContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FavoritesProvider>
    <CompareProvider>
      <App />
    </CompareProvider>
    </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
