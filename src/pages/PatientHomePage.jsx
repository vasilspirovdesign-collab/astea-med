import { useRef } from 'react'
import { ArrowLeft, Bell, Plus, Archive, Users, ChevronRight } from 'lucide-react'
import avatarPatient from '../assets/avatar-patient.png'
import avatarIvanova from '../assets/avatar-ivanova.png'
import avatarPetrov from '../assets/avatar-petrov.png'
import avatarGeorgieva from '../assets/avatar-georgieva.png'

// ─── Design tokens ────────────────────────────────────────────────────────────
const c = {
  blueDeep:  '#0c447c',
  green:     '#1d9e75',
  textPri:   '#0d0d0d',
  textSec:   '#717177',
  textMut:   '#b2b2b8',
  border:    '#e5e5e9',
  white:     '#ffffff',
  surface:   '#f8f8f8',
  beige:     '#edebe4',
  yellowTint:'#fff9e4',
  greenTint: '#f6fdfb',
  amberTint: '#fffbf5',
  amber:     '#ec9509',
}

const quicksand = '"Quicksand", sans-serif'
const inter     = 'Inter, sans-serif'

// ─── Type scale (from Figma) ──────────────────────────────────────────────────
const L1 = (x) => ({ fontFamily: quicksand, fontWeight: 600, fontSize: 20, lineHeight: '100%', ...x })
const L2 = (x) => ({ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', ...x })
const L3 = (x) => ({ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', ...x })
const L4 = (x) => ({ fontFamily: inter, fontWeight: 400, fontSize: 11, lineHeight: '18px', ...x })
const L5 = (x) => ({ fontFamily: inter, fontWeight: 500, fontSize: 12, lineHeight: '100%', ...x })
const L6 = (x) => ({ fontFamily: inter, fontWeight: 500, fontSize: 10, lineHeight: '100%', letterSpacing: '0.8px', textTransform: 'uppercase', ...x })

// ─── Shared card style ────────────────────────────────────────────────────────
const card = { background: c.white, border: `1px solid ${c.border}`, overflow: 'hidden' }

// ─── Drag-to-scroll hook ──────────────────────────────────────────────────────
function useDragScroll() {
  const ref = useRef(null)
  const dragging = useRef(false)
  const startX   = useRef(0)
  const startSL  = useRef(0)

  return {
    ref,
    onMouseDown(e) {
      dragging.current = true
      startX.current  = e.pageX
      startSL.current = ref.current.scrollLeft
      ref.current.style.cursor = 'grabbing'
    },
    onMouseMove(e) {
      if (!dragging.current) return
      e.preventDefault()
      ref.current.scrollLeft = startSL.current - (e.pageX - startX.current)
    },
    onMouseUp()    { dragging.current = false; if (ref.current) ref.current.style.cursor = 'grab' },
    onMouseLeave() { dragging.current = false; if (ref.current) ref.current.style.cursor = 'grab' },
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: 'New request',   icon: <Plus   size={16} strokeWidth={1.75} color={c.textPri} /> },
  { label: 'My records',    icon: <Archive size={16} strokeWidth={1.75} color={c.textPri} /> },
  { label: 'Prescriptions', icon: <span style={L5({ color: c.blueDeep, fontSize: 13 })}>Rx</span> },
  { label: 'Referrals',     icon: <Users   size={16} strokeWidth={1.75} color={c.textPri} /> },
]

const SPECIALISTS = [
  { name: 'Dr. Ivanova',   specialty: 'General practice', avatar: avatarIvanova },
  { name: 'Dr. Petrov',    specialty: 'Cardiologist',     avatar: avatarPetrov },
  { name: 'Dr. Georgieva', specialty: 'Dermatologist',    avatar: avatarGeorgieva },
  { name: 'Dr. Dimitrov',  specialty: 'Neurologist',      avatar: null, initials: 'DD' },
]

const REQUESTS = [
  { title: 'Sick note',    meta: 'Completed · June 12',  badge: 'Completed'  },
  { title: 'Consultation', meta: 'In progress · June 10', badge: 'In progress' },
]

const NEWS = [
  { tag: 'Prevention', tagColor: c.green,   tagBg: c.greenTint, tagBorder: c.green, title: 'How to prepare for a GP consultation',  read: '4 min read' },
  { tag: 'Wellness',   tagColor: c.amber,   tagBg: c.amberTint, tagBorder: c.amber, title: 'Understanding your lab results',          read: '6 min read' },
  { tag: 'Seasonal',   tagColor: c.textSec, tagBg: c.beige,     tagBorder: 'transparent', title: 'Flu season: symptoms vs common cold', read: '3 min read' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionHeader({ label, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
      <span style={{ ...L6({ color: c.textSec }), flex: 1 }}>{label}</span>
      {action && <span style={L5({ color: c.green, whiteSpace: 'nowrap' })}>{action}</span>}
    </div>
  )
}

function Avatar({ src, initials, size = 40, radius }) {
  const r = radius ?? size / 2
  return (
    <div style={{ width: size, height: size, borderRadius: r, flexShrink: 0, background: c.beige, overflow: 'hidden', position: 'relative' }}>
      {src
        ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : <span style={{ ...L5({ color: c.textPri, fontSize: 14 }), position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{initials}</span>
      }
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PatientHomePage({ onBack }) {
  const specialistsDrag = useDragScroll()
  const newsDrag        = useDragScroll()

  return (
    <div style={{ width: '100%', height: '100%', background: c.white, display: 'flex', flexDirection: 'column', fontFamily: inter }}>

        {/* Status Bar */}
        <div style={{ height: 54, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
            <span style={{ fontWeight: 590, fontSize: 17, lineHeight: '22px', letterSpacing: '-0.4px', color: '#000', flex: 1, textAlign: 'center' }}>9:41</span>
            <div style={{ width: 124, flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'flex-end' }}>
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="0.5"/><rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="3" height="12" rx="0.5"/></svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-3.5a6 6 0 0 1 4.24 1.76l-1.42 1.42A4 4 0 0 0 8 8a4 4 0 0 0-2.83 1.17L3.76 7.76A6 6 0 0 1 8 6Zm0-4a10 10 0 0 1 7.07 2.93L13.66 6.34A8 8 0 0 0 8 4a8 8 0 0 0-5.66 2.34L.93 4.93A10 10 0 0 1 8 2Z"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor"><rect x="0" y="1" width="21" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/><rect x="1" y="2" width="18" height="8" rx="1.5"/><path d="M22 4v4a2 2 0 0 0 0-4Z" opacity="0.4"/></svg>
            </div>
          </div>
        </div>

        {/* NavBar */}
        <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ArrowLeft size={24} strokeWidth={1.75} color={c.textPri} />
          </button>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 3.4, alignItems: 'center' }}>
            <span style={{ fontFamily: quicksand, fontWeight: 700, fontSize: 15.2, letterSpacing: '1.27px', color: c.blueDeep, whiteSpace: 'nowrap' }}>ASTEA</span>
            <span style={{ fontFamily: quicksand, fontWeight: 700, fontSize: 15.2, letterSpacing: '1.27px', color: c.green, whiteSpace: 'nowrap' }}>MED</span>
          </div>
          <div style={{ flex: 1 }} />
          <Bell size={20} strokeWidth={1.75} color={c.textPri} style={{ flexShrink: 0 }} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: c.border, flexShrink: 0 }} />

        {/* Scrollable content */}
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 16px 8px' }}>

            {/* Greeting */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={L3({ color: c.textSec })}>Good morning,</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar src={avatarPatient} size={32} radius={18} />
                <span style={L1({ color: c.textPri })}>Peter Ivanov</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SectionHeader label="Quick Actions" />
              <div style={{ display: 'flex', gap: 8 }}>
                {QUICK_ACTIONS.map((qa) => (
                  <button key={qa.label} style={{ ...card, borderRadius: 8, flex: 1, height: 88, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 6, cursor: 'pointer' }}>
                    <div style={{ width: 32, height: 32, background: c.surface, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {qa.icon}
                    </div>
                    <span style={L4({ color: c.textPri, whiteSpace: 'nowrap' })}>{qa.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SectionHeader label="Upcoming" />
              <div style={{ ...card, borderRadius: 10, height: 72, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}>
                <Avatar src={avatarIvanova} size={40} radius={22} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                  <span style={{ ...L2({ color: c.textPri }), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dr. Ivanova</span>
                  <span style={L4({ color: c.textSec, whiteSpace: 'nowrap' })}>General practice · Jun 18 · 10:30</span>
                </div>
                <ChevronRight size={16} strokeWidth={1.5} color={c.textSec} />
              </div>
            </div>

            {/* Recent Requests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SectionHeader label="Recent Requests" action="See all" />
              {REQUESTS.map((r) => (
                <div key={r.title} style={{ ...card, borderRadius: 8, height: 64, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                    <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 14, color: c.textPri, whiteSpace: 'nowrap' }}>{r.title}</span>
                    <span style={L4({ color: c.textSec, whiteSpace: 'nowrap' })}>{r.meta}</span>
                  </div>
                  <div style={{ border: `1px solid ${c.border}`, borderRadius: 11, padding: '4px 10px', flexShrink: 0 }}>
                    <span style={L5({ color: c.textPri })}>{r.badge}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Browse Specialists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SectionHeader label="Browse Specialists" action="See all" />
              <div
                ref={specialistsDrag.ref}
                onMouseDown={specialistsDrag.onMouseDown}
                onMouseMove={specialistsDrag.onMouseMove}
                onMouseUp={specialistsDrag.onMouseUp}
                onMouseLeave={specialistsDrag.onMouseLeave}
                className="no-scrollbar"
                style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, cursor: 'grab', userSelect: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {SPECIALISTS.map((s) => (
                  <div key={s.name} style={{ ...card, borderRadius: 12, width: 120, height: 144, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16 }}>
                    <Avatar src={s.avatar} initials={s.initials} size={52} radius={30} />
                    <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 13, lineHeight: '18px', color: c.textPri, whiteSpace: 'nowrap' }}>{s.name}</span>
                    <span style={L4({ color: c.textSec, whiteSpace: 'nowrap' })}>{s.specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Tip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SectionHeader label="Health Tip of the Day" />
              <div style={{ background: c.yellowTint, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={L2({ color: c.textPri, whiteSpace: 'nowrap' })}>Stay hydrated</span>
                <span style={L3({ color: c.textSec })}>Adults need 6–8 glasses of water daily. Dehydration can cause headaches, fatigue, and difficulty concentrating.</span>
              </div>
            </div>

            {/* Health News */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SectionHeader label="Health News & Articles" action="See all" />
              <div
                ref={newsDrag.ref}
                onMouseDown={newsDrag.onMouseDown}
                onMouseMove={newsDrag.onMouseMove}
                onMouseUp={newsDrag.onMouseUp}
                onMouseLeave={newsDrag.onMouseLeave}
                className="no-scrollbar"
                style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 2, cursor: 'grab', userSelect: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {NEWS.map((n) => (
                  <div key={n.title} style={{ ...card, borderRadius: 12, width: 196, height: 152, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8, padding: 14 }}>
                    <div style={{ background: n.tagBg, border: `1px solid ${n.tagBorder}`, borderRadius: 4, padding: '3px 8px', alignSelf: 'flex-start' }}>
                      <span style={L5({ color: n.tagColor })}>{n.tag}</span>
                    </div>
                    <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 13, lineHeight: '18px', color: c.textPri }}>{n.title}</span>
                    <span style={{ ...L4({ color: c.textSec }), whiteSpace: 'nowrap', marginTop: 'auto' }}>{n.read}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ flexShrink: 0, padding: '12px 16px 24px', background: c.white, borderTop: `1px solid ${c.border}` }}>
          <button style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={L2({ color: c.white, textAlign: 'center' })}>New request</span>
          </button>
        </div>

    </div>
  )
}
