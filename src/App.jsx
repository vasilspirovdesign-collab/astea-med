import { useState, useEffect } from 'react'
import SplashPage from './pages/SplashPage'
import PatientHomePage from './pages/PatientHomePage'
import PhoneMockup from './components/PhoneMockup'

export default function App() {
  const [persona, setPersona] = useState(null)

  function selectPersona(p) {
    history.pushState({ persona: p }, '')
    setPersona(p)
  }

  function goBack() {
    history.back()
  }

  useEffect(() => {
    function onPop(e) {
      setPersona(e.state?.persona ?? null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (!persona) return <SplashPage onSelect={selectPersona} />

  if (persona === 'patient') return (
    <PhoneMockup>
      <PatientHomePage onBack={goBack} />
    </PhoneMockup>
  )

  return (
    <div style={{ display: 'flex', height: '100dvh', alignItems: 'center', justifyContent: 'center', background: '#f3f3f3' }}>
      <p style={{ fontSize: 24, fontWeight: 600 }}>Specialist dashboard — coming soon</p>
    </div>
  )
}
