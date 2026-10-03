import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// La invitación siempre empieza en la portada, sin restaurar el scroll anterior.
window.history.scrollRestoration = 'manual'
const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
resetScroll()
window.addEventListener('pageshow', resetScroll)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
