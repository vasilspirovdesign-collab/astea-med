import { useState } from 'react'
import SplashPage from './pages/SplashPage'

export default function App() {
  const [persona, setPersona] = useState(null)

  if (!persona) {
    return <SplashPage onSelect={setPersona} />
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p className="text-2xl font-semibold text-foreground capitalize">{persona} dashboard</p>
    </div>
  )
}
