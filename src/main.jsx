import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Hide preloader once React is mounted
const hidePreloader = () => {
  const preloader = document.getElementById('preloader')
  if (preloader) {
    preloader.classList.add('fade-out')
    setTimeout(() => preloader.remove(), 600)
  }
}

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Hide preloader after render
requestAnimationFrame(() => {
  requestAnimationFrame(hidePreloader)
})

// Fallback: hide preloader after 5 seconds
setTimeout(hidePreloader, 5000)
