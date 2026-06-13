import { useState } from 'react'
import avatarPatient from '../assets/avatar-patient.png'
import avatarSpecialist from '../assets/avatar-specialist.png'

const PERSONAS = [
  {
    id: 'patient',
    role: 'Patient',
    name: 'Peter Ivanov',
    age: '42 years old',
    location: 'Sofia, Bulgaria',
    avatar: avatarPatient,
  },
  {
    id: 'specialist',
    role: 'Specialist',
    name: 'Dr. Ivanova, MD – Doctor',
    age: '51 years old',
    location: 'Sofia, Bulgaria',
    avatar: avatarSpecialist,
  },
]

const bricolage = '"Bricolage Grotesque Variable", sans-serif'
const inter = 'Inter, sans-serif'

const base = {
  border: 'none',
  outline: 'none',
  boxSizing: 'border-box',
}

export default function SplashPage({ onSelect }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ ...base, position: 'relative', display: 'flex', height: '100dvh', flexDirection: 'column', overflow: 'hidden', background: '#f3f3f3' }}>

      {/* Brand */}
      <div style={{ ...base, flexShrink: 0, padding: 'clamp(16px, 3vw, 40px) clamp(24px, 5vw, 64px) 0' }}>
        <span style={{ fontFamily: inter, fontWeight: 600, fontSize: 'clamp(14px, 1.8vw, 28px)', textTransform: 'uppercase', color: '#000', letterSpacing: '0.02em' }}>
          ASTEA
        </span>
      </div>

      {/* Headline */}
      <div style={{ ...base, flexShrink: 0, padding: 'clamp(8px, 1.5vw, 24px) clamp(24px, 5vw, 64px) 0' }}>
        <h1 style={{ ...base, fontFamily: bricolage, fontSize: 'clamp(26px, 7vw, 120px)', fontWeight: 382, lineHeight: 1, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#000', margin: 0 }}>
          Select user persona
        </h1>
      </div>

      {/* Persona panels */}
      <div style={{ ...base, display: 'flex', flex: 1, minHeight: 0, flexDirection: 'column' }}
        className="md:!flex-row">
        {PERSONAS.map((persona, i) => {
          const isHovered = hovered === persona.id
          return (
            <div
              key={persona.id}
              role="button"
              tabIndex={0}
              style={{
                ...base,
                position: 'relative',
                display: 'flex',
                flex: 1,
                cursor: 'pointer',
                userSelect: 'none',
                background: isHovered ? 'rgba(0,0,0,0.04)' : 'transparent',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={() => setHovered(persona.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect?.(persona.id)}
              onKeyDown={(e) => e.key === 'Enter' && onSelect?.(persona.id)}
            >
              {/* Separator — top on mobile second card, right on desktop first card */}
              {i === 1 && (
                <div style={{ position: 'absolute', top: 0, left: 'clamp(24px, 5vw, 64px)', right: 'clamp(24px, 5vw, 64px)', height: 1, background: 'rgba(0,0,0,0.1)' }}
                  className="md:!hidden" />
              )}
              {i === 0 && (
                <div style={{ position: 'absolute', right: 0, top: 32, bottom: 32, width: 1, background: 'rgba(0,0,0,0.1)' }}
                  className="hidden md:!block" />
              )}

              {/* Content */}
              <div
                style={{ ...base, display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 32px)', padding: 'clamp(16px, 3vw, 32px) clamp(24px, 5vw, 64px)', width: '100%' }}
                className="md:!flex-col md:!items-start md:!justify-center"
              >
                {/* Avatar + role */}
                <div style={{ ...base, display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 32px)', flexShrink: 0 }}>
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    style={{
                      display: 'block',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      width: 'clamp(48px, 10vw, 254px)',
                      height: 'clamp(48px, 10vw, 254px)',
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                  <h2 style={{ ...base, fontFamily: bricolage, fontSize: 'clamp(18px, 4.5vw, 80px)', fontWeight: 382, lineHeight: 1, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#000', margin: 0 }}>
                    {persona.role}
                  </h2>
                </div>

                {/* Info */}
                <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.6vw, 10px)', marginTop: 0 }}
                  className="md:!mt-6">
                  {[persona.name, persona.age, persona.location].map((line) => (
                    <span key={line} style={{ fontFamily: inter, fontSize: 'clamp(11px, 1.5vw, 28px)', fontWeight: 400, lineHeight: 1.2, color: '#000' }}>
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
