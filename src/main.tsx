import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl font-display">Loading ChronoSphere...</div>
      </div>
    }>
      <App />
    </Suspense>
  </StrictMode>,
)
