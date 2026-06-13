import { useState } from 'react'
import SplashPage from './pages/SplashPage'
import PatientHomePage from './pages/PatientHomePage'

export default function App() {
  const [persona, setPersona] = useState(null)

  if (!persona) return <SplashPage onSelect={setPersona} />
  if (persona === 'patient') return <PatientHomePage />

  return (
    <div style={{ display: 'flex', height: '100dvh', alignItems: 'center', justifyContent: 'center', background: '#f3f3f3' }}>
      <p style={{ fontSize: 24, fontWeight: 600 }}>Specialist dashboard — coming soon</p>
    </div>
  )
}
