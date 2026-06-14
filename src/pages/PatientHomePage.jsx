import { useState, useRef } from 'react'
import { ArrowLeft, Bell, Plus, Archive, Users, ChevronRight, Menu, LogOut, Settings, FileText, Calendar, X } from 'lucide-react'
import avatarPatient from '../assets/avatar-patient.png'
import avatarIvanova from '../assets/avatar-ivanova.png'
import avatarPetrov from '../assets/avatar-petrov.png'
import avatarGeorgieva from '../assets/avatar-georgieva.png'
import avatarDimitrov from '../assets/avatar-1.png'

// ─── Design tokens ────────────────────────────────────────────────────────────
const c = {
  blue:      '#245dcf',
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
  { label: 'New request',   icon: <Plus   size={16} strokeWidth={1.75} color={c.textPri} />, newRequest: true },
  { label: 'My records',    icon: <Archive size={16} strokeWidth={1.75} color={c.textPri} /> },
  { label: 'Prescriptions', icon: <span style={L5({ color: c.blueDeep, fontSize: 13 })}>Rx</span> },
  { label: 'Referrals',     icon: <Users   size={16} strokeWidth={1.75} color={c.textPri} /> },
]

const SPECIALISTS = [
  { name: 'Dr. Ivanova',   specialty: 'General practice', avatar: avatarIvanova },
  { name: 'Dr. Petrov',    specialty: 'Cardiologist',     avatar: avatarPetrov },
  { name: 'Dr. Georgieva', specialty: 'Dermatologist',    avatar: avatarGeorgieva },
  { name: 'Dr. Dimitrov',  specialty: 'Neurologist',      avatar: avatarDimitrov },
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

const REQUEST_TYPES = [
  { id: 'consultation', title: 'Consultation', sub: 'Symptoms or medical question' },
  { id: 'document',     title: 'Document',     sub: 'Sick note or referral' },
]

const SYMPTOMS = ['Fever', 'Cough', 'Pain', 'Fatigue', 'Nausea', 'Blurred vision', 'Ear pain', 'Insomnia', 'Headache', 'Dizziness', 'Shortness of breath', 'Chest pain']
const DURATION_OPTIONS = ['Today', '2–3 days', 'Week+']

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

const SLOT_DAYS = [
  { label: 'Wednesday, June 18', slots: [['9:00', '10:30', '11:00'], ['14:00', '15:30', '16:00']] },
  { label: 'Thursday, June 19',  slots: [['9:00', '11:30', '13:00']] },
]

function AppointmentBookedView({ onHome, slot }) {
  const slotLabel = slot ? slot.replace(/^[^-]+-/, '').replace('Wed', 'Wednesday, June 18').replace('Thu', 'Thursday, June 19') : 'Wednesday, June 18 – 10:30'

  return (
    <div className="animate-in fade-in duration-300" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* invisible navbar spacer */}
      <div style={{ height: 52, flexShrink: 0 }} />

      {/* Center content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16, paddingTop: 24, gap: 8 }}>
        <div style={{ width: 72, height: 72, borderRadius: 40, border: '1px solid #209c8b', background: c.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#209c8b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <span style={L2({ color: c.textPri, textAlign: 'center' })}>Appointment booked</span>
        <span style={L3({ color: c.textSec, whiteSpace: 'nowrap' })}>{slotLabel}</span>
        <span style={L4({ color: c.textSec, whiteSpace: 'nowrap' })}>Dr. Ivanova – Room 3</span>
        <div style={{ background: c.greenTint, border: `1px solid ${c.green}`, borderRadius: 4, padding: '3px 8px', marginTop: 4 }}>
          <span style={L5({ color: c.green })}>Consultation closed</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onHome}
          style={{ width: '100%', height: 44, background: c.white, borderRadius: 8, border: `1.5px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Back to home</span>
        </button>
      </div>
    </div>
  )
}

function BookAppointmentView({ onBack, onConfirm }) {
  const [selected, setSelected] = useState('Wed-10:30')

  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>BOOK APPOINTMENT</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 24, scrollbarWidth: 'none' }}>
        <span style={L2({ color: c.textPri })}>Dr. Ivanova – Available slots</span>

        {SLOT_DAYS.map(({ label, slots }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={L5({ color: c.textSec })}>{label}</span>
            {slots.map((row, ri) => (
              <div key={ri} style={{ background: c.surface, borderRadius: 8, padding: '4px', display: 'flex', gap: 2 }}>
                {row.map(time => {
                  const key = `${label.split(',')[0].slice(0,3)}-${time}`
                  const active = selected === key
                  return (
                    <button
                      key={time}
                      onClick={() => setSelected(key)}
                      className="transition-all duration-150"
                      style={{ flex: 1, height: 34, borderRadius: 6, border: 'none', cursor: 'pointer', background: active ? c.blue : 'transparent', ...L5({ color: active ? c.white : c.textSec }) }}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        ))}

        <div style={{ height: 4 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={() => onConfirm(selected)}
          style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.white, textAlign: 'center' })}>Confirm</span>
        </button>
      </div>
    </>
  )
}

function DoctorsReplyView({ onBack, onClose, onBookAppointment }) {
  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>DOCTOR'S REPLY</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 24, scrollbarWidth: 'none' }}>

        {/* Dr. Ivanova card */}
        <div style={{ ...card, borderRadius: 10, height: 72, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}>
          <Avatar src={avatarIvanova} size={40} radius={22} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
            <span style={{ ...L2({ color: c.textPri }), whiteSpace: 'nowrap' }}>Dr. Ivanova</span>
            <span style={L4({ color: c.textSec, whiteSpace: 'nowrap' })}>General practice · Jun 18 · 10:30</span>
          </div>
        </div>

        {/* Message bubble */}
        <div style={{ background: c.surface, borderRadius: 12, padding: '14px 16px' }}>
          <span style={L3({ color: c.textPri })}>Hello! Your symptoms describe a viral infection. I recommend rest, plenty of fluids and ibuprofen if needed.</span>
        </div>

        {/* Next steps */}
        <div style={{ background: c.yellowTint, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={L2({ color: c.textPri })}>Next steps</span>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {['Rest for 2–3 days', 'Ibuprofen 400mg when temperature exceeds 38 degrees', 'If symptoms worsen – book an appointment'].map((step, i) => (
              <li key={i} style={{ ...L3({ color: c.textSec }), marginBottom: i < 2 ? 4 : 0 }}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Consultation closed banner */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '11px 15px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: inter, fontWeight: 700, fontSize: 13, color: c.textPri }}>Consultation closed</span>
          <span style={L4({ color: c.textSec })}>No physical visit required at this point</span>
        </div>

        <div style={{ height: 4 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onBookAppointment}
          style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.white, textAlign: 'center' })}>Book appointment</span>
        </button>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onClose}
          style={{ width: '100%', height: 44, background: c.white, borderRadius: 8, border: `1.5px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Close</span>
        </button>
      </div>
    </>
  )
}

function NotificationsView({ onClose, onReply }) {
  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>NOTIFICATIONS</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Notification list */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px', scrollbarWidth: 'none' }}>
        {/* Reply card */}
        <div onClick={onReply} style={{ ...card, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'center', padding: '8px 16px', cursor: 'pointer' }}>
          {/* Message icon */}
          <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflow: 'hidden' }}>
            <span style={L2({ color: c.textPri })}>New reply</span>
            <span style={L3({ color: c.textSec })}>Dr. Ivanova replied to your consultation</span>
            <span style={L4({ color: c.textSec })}>Just now</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onClose}
          style={{ width: '100%', height: 44, background: c.white, borderRadius: 8, border: `1.5px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Close</span>
        </button>
      </div>
    </>
  )
}

function UploadFilesView({ onBack, onContinue, files, setFiles }) {
  function handleDrop(e) {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer?.files ?? e.target.files ?? [])
    setFiles(prev => [...prev, ...dropped])
  }

  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>UPLOAD FILES</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Progress bar — step 2 of 3 */}
      <div style={{ padding: '8px 16px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.blue }} />
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.blue }} />
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.surface }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={L2({ color: c.textPri })}>Add photos or files</span>
          <span style={L3({ color: c.textSec })}>Optional - helps your doctor</span>
        </div>

        {/* Drop zone */}
        <label
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, height: 168, borderRadius: 12, border: `1px dashed ${c.border}`, background: c.surface, cursor: 'pointer' }}
        >
          <input type="file" multiple accept=".jpg,.jpeg,.png,.pdf" onChange={handleDrop} style={{ display: 'none' }} />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.textPri} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span style={L3({ color: c.textPri })}>Add files or photo</span>
          <span style={L4({ color: c.textSec })}>JPG, PNG, PDF</span>
        </label>

        {files.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {files.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.white }}>
                <span style={L3({ color: c.textPri, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })}>{f.name}</span>
                <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <span style={L5({ color: c.textSec })}>✕</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: 12 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onContinue}
          style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.white, textAlign: 'center' })}>Continue</span>
        </button>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onContinue}
          style={{ width: '100%', height: 44, background: c.white, borderRadius: 8, border: `1.5px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Skip</span>
        </button>
      </div>
    </>
  )
}

function SubmitSuccessView({ onHome }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Invisible navbar spacer to match layout */}
      <div style={{ height: 52, flexShrink: 0 }} />

      {/* Center content */}
      <div className="animate-in fade-in duration-300" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', gap: 24, paddingTop: 24 }}>

        {/* Icon + title + tag */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%' }}>
          <div style={{ width: 72, height: 72, borderRadius: 40, border: '1px solid #209c8b', background: c.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#209c8b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </div>
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Request sent</span>
          <div style={{ background: c.greenTint, border: `1px solid ${c.green}`, borderRadius: 4, padding: '3px 8px' }}>
            <span style={L5({ color: c.green })}>In progress</span>
          </div>
        </div>

        {/* Dr. Ivanova card */}
        <div style={{ ...card, borderRadius: 10, height: 72, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', width: '100%' }}>
          <Avatar src={avatarIvanova} size={40} radius={22} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
            <span style={{ ...L2({ color: c.textPri }), whiteSpace: 'nowrap' }}>Dr. Ivanova</span>
            <span style={L4({ color: c.textSec, whiteSpace: 'nowrap' })}>Expected reply: within 24 hours</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onHome}
          style={{ width: '100%', height: 44, background: c.white, borderRadius: 8, border: `1.5px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Back to home</span>
        </button>
      </div>
    </div>
  )
}

function ReviewAndSendView({ onBack, onEdit, onSubmit, symptoms, duration, description, files }) {
  const photoAssets = files.filter(f => f.type?.startsWith('image/'))
  const otherFiles  = files.filter(f => !f.type?.startsWith('image/'))

  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>FINAL CHECK</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Progress bar — step 3 of 3 */}
      <div style={{ padding: '8px 16px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.blue }} />
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.blue }} />
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.blue }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 16, scrollbarWidth: 'none' }}>
        <span style={L2({ color: c.textPri })}>Final check before sending</span>

        {/* Summary card */}
        <div style={{ border: `1px solid ${c.border}`, borderRadius: 8, overflow: 'hidden' }}>
          {[
            { label: 'Type',       value: 'Consultation' },
            { label: 'Symptoms',   value: symptoms.length ? symptoms.join(', ') : '—' },
            { label: 'Duration',   value: duration },
            { label: 'Description', value: description || '—' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ height: 1, background: c.border }} />
              <div style={{ padding: '12px 16px', background: c.white, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={L4({ color: c.textSec })}>{label}</span>
                <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 14, color: c.textPri }}>{value}</span>
              </div>
            </div>
          ))}

          {/* Photos row */}
          <div style={{ height: 1, background: c.border }} />
          <div style={{ padding: '12px 16px', background: c.white, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={L4({ color: c.textSec })}>Photos and documents</span>
            {files.length === 0 ? (
              <span style={L3({ color: c.textMut })}>None added</span>
            ) : (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {photoAssets.map((f, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 8, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
                      <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <span style={{ ...L6({ color: c.textPri }), maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                  </div>
                ))}
                {otherFiles.map((f, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={L5({ color: c.textSec, fontSize: 10 })}>PDF</span>
                    </div>
                    <span style={{ ...L6({ color: c.textPri }), maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onSubmit}
          style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.white, textAlign: 'center' })}>Submit</span>
        </button>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onEdit}
          style={{ width: '100%', height: 44, background: c.white, borderRadius: 8, border: `1.5px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Edit</span>
        </button>
      </div>
    </>
  )
}

function ConsultationSymptomsView({ onBack, onContinue, symptoms, setSymptoms, duration, setDuration, description, setDescription }) {
  const [showAll, setShowAll] = useState(false)

  const visibleSymptoms = showAll ? SYMPTOMS : SYMPTOMS.slice(0, 8)

  function toggleSymptom(s) {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>NEW CONSULTATION</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Progress bar — step 1 of 3 */}
      <div style={{ padding: '8px 16px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.blue }} />
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.surface }} />
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: c.surface }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 20, scrollbarWidth: 'none' }}>

        {/* Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={L2({ color: c.textPri, fontSize: 16 })}>What is bothering you?</span>
          <span style={L3({ color: c.textSec })}>Select or describe your symptoms</span>
        </div>

        {/* Symptom chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {visibleSymptoms.map(s => {
              const active = symptoms.includes(s)
              return (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className="transition-all duration-150"
                  style={{
                    padding: '6px 12px',
                    borderRadius: 14,
                    border: active ? 'none' : `1px solid ${c.border}`,
                    background: active ? c.blue : c.white,
                    cursor: 'pointer',
                    ...L5({ color: active ? c.white : c.textSec }),
                  }}
                >
                  {s}
                </button>
              )
            })}
          </div>
          <button
            onClick={() => setShowAll(p => !p)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'center', padding: 0 }}
          >
            <span style={L5({ color: c.green })}>{showAll ? 'See less' : 'See more'}</span>
          </button>
        </div>

        {/* Duration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={L5({ color: c.textSec })}>Duration</span>
          <div style={{ background: c.surface, borderRadius: 8, padding: '4px', display: 'flex', gap: 2 }}>
            {DURATION_OPTIONS.map(opt => {
              const active = duration === opt
              return (
                <button
                  key={opt}
                  onClick={() => setDuration(opt)}
                  className="transition-all duration-150"
                  style={{
                    flex: 1,
                    height: 34,
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    background: active ? c.blue : 'transparent',
                    ...L5({ color: active ? c.white : c.textSec }),
                  }}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={L5({ color: c.textSec })}>Description (optional)</span>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe in more detail..."
            style={{
              width: '100%',
              height: 100,
              borderRadius: 8,
              border: `1px solid ${c.border}`,
              padding: 12,
              resize: 'none',
              boxSizing: 'border-box',
              ...L3({ color: c.textPri }),
              outline: 'none',
              fontFamily: inter,
            }}
          />
        </div>

        {/* spacer so content isn't hidden under CTA */}
        <div style={{ height: 12 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onContinue}
          style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.white, textAlign: 'center' })}>Continue</span>
        </button>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={onBack}
          style={{ width: '100%', height: 44, background: c.white, borderRadius: 8, border: `1.5px solid ${c.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.textPri, textAlign: 'center' })}>Cancel</span>
        </button>
      </div>
    </>
  )
}

const DOC_TYPES = [
  { id: 'sick-note',    title: 'Sick note',    sub: 'For employer or school' },
  { id: 'referral',     title: 'Referral',     sub: 'To a specialist' },
  { id: 'prescription', title: 'Prescription', sub: 'For Pharmacy' },
  { id: 'other',        title: 'Other',        sub: 'Describe below' },
]
const ISSUED_TO = ['Employer', 'School / University', 'Other']

function DocumentRequestView({ onBack }) {
  const [docType,  setDocType]  = useState('sick-note')
  const [duration, setDuration] = useState('2–3 days')
  const [issuedTo, setIssuedTo] = useState('Employer')
  const [from,     setFrom]     = useState('')
  const [to,       setTo]       = useState('')
  const [reason,   setReason]   = useState('')
  const fromRef = useRef(null)
  const toRef   = useRef(null)

  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>NEW DOCUMENT</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 20, scrollbarWidth: 'none' }}>
        <span style={L2({ color: c.textPri })}>Document request</span>

        {/* Document type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={L5({ color: c.textSec })}>Document type</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[DOC_TYPES.slice(0, 2), DOC_TYPES.slice(2)].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 8 }}>
                {row.map(dt => {
                  const active = docType === dt.id
                  return (
                    <button
                      key={dt.id}
                      onClick={() => setDocType(dt.id)}
                      className="transition-all duration-150"
                      style={{
                        flex: 1,
                        height: 94,
                        borderRadius: 8,
                        border: active ? `2px solid ${c.blue}` : `1px solid ${c.border}`,
                        background: c.white,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        padding: '14px 16px',
                      }}
                    >
                      <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 14, color: c.textPri }}>{dt.title}</span>
                      <span style={L4({ color: c.textSec, textAlign: 'center' })}>{dt.sub}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={L5({ color: c.textSec })}>Duration</span>
          <div style={{ background: c.surface, borderRadius: 8, padding: '4px', display: 'flex', gap: 2 }}>
            {DURATION_OPTIONS.map(opt => {
              const active = duration === opt
              return (
                <button
                  key={opt}
                  onClick={() => setDuration(opt)}
                  className="transition-all duration-150"
                  style={{ flex: 1, height: 34, borderRadius: 6, border: 'none', cursor: 'pointer', background: active ? c.blue : 'transparent', ...L5({ color: active ? c.white : c.textSec }) }}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sick note details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={L5({ color: c.textSec })}>Sick note details</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ label: 'From', val: from, set: setFrom, ref: fromRef }, { label: 'To', val: to, set: setTo, ref: toRef }].map(({ label, val, set, ref }) => (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 14, lineHeight: '20px', color: c.textPri }}>{label}</span>
                <div style={{ position: 'relative' }}>
                  <input
                    ref={ref}
                    type="date"
                    value={val}
                    onChange={e => set(e.target.value)}
                    style={{ height: 36, borderRadius: 8, border: `1px solid ${c.border}`, padding: '4px 36px 4px 12px', boxSizing: 'border-box', width: '100%', ...L3({ color: val ? c.textPri : c.textSec }), outline: 'none', fontFamily: inter, boxShadow: '0 1px 1px rgba(0,0,0,0.1)', WebkitAppearance: 'none', appearance: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => ref.current?.showPicker()}
                    style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                  >
                    <Calendar size={14} strokeWidth={1.5} color={c.textSec} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={L5({ color: c.textSec })}>Reason</span>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="e.g Back pain, fever"
            style={{ height: 100, borderRadius: 8, border: `1px solid ${c.border}`, padding: 12, resize: 'none', boxSizing: 'border-box', width: '100%', ...L3({ color: c.textPri }), outline: 'none', fontFamily: inter }}
          />
        </div>

        {/* Issued to */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={L5({ color: c.textSec })}>Issued to</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ISSUED_TO.map(opt => {
              const active = issuedTo === opt
              return (
                <button
                  key={opt}
                  onClick={() => setIssuedTo(opt)}
                  className="transition-all duration-150"
                  style={{ padding: '6px 12px', borderRadius: 14, border: active ? 'none' : `1px solid ${c.border}`, background: active ? c.blue : c.white, cursor: 'pointer', ...L5({ color: active ? c.white : c.textSec }) }}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '0 16px 32px', background: c.white, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.white, textAlign: 'center' })}>Continue</span>
        </button>
        <span style={{ ...L5({ color: c.textSec }), textAlign: 'center' }}>A doctor will review and respond within 24h.</span>
      </div>
    </>
  )
}

function RequestTypeView({ onBack, onConsultation, onDocument }) {
  const [selected, setSelected] = useState('consultation')

  return (
    <>
      {/* NavBar */}
      <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 12, background: c.white }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}
        >
          <ArrowLeft size={20} strokeWidth={1.75} color={c.textPri} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', ...L6({ color: c.textSec }) }}>NEW REQUEST</span>
        <div style={{ width: 32, flexShrink: 0 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 16px 12px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <span style={L2({ color: c.textPri })}>What do you need?</span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REQUEST_TYPES.map((type) => {
            const active = selected === type.id
            return (
              <div
                key={type.id}
                onClick={() => setSelected(type.id)}
                className="transition-all duration-150"
                style={{
                  background: c.white,
                  border: active ? `2px solid ${c.blue}` : `1px solid ${c.border}`,
                  borderRadius: 8,
                  minHeight: 64,
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 4,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 14, lineHeight: '18px', color: c.textPri }}>{type.title}</span>
                <span style={L4({ color: c.textSec })}>{type.sub}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ flexShrink: 0, padding: '12px 16px 32px', background: c.white, borderTop: `1px solid ${c.border}` }}>
        <button
          className="transition-all duration-150 active:scale-[0.98]"
          onClick={() => { if (selected === 'consultation') onConsultation(); else if (selected === 'document') onDocument() }}
          style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={L2({ color: c.white, textAlign: 'center' })}>Next</span>
        </button>
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PatientHomePage({ onBack }) {
  const [view, setView] = useState('home')
  const [menuOpen,           setMenuOpen]           = useState(false)
  const [hasNotification,    setHasNotification]    = useState(false)
  const [bookedSlot,         setBookedSlot]         = useState(null)
  const [consultSymptoms,    setConsultSymptoms]    = useState(['Fever', 'Cough'])
  const [consultDuration,    setConsultDuration]    = useState('2–3 days')
  const [consultDescription, setConsultDescription] = useState('')
  const [consultFiles,       setConsultFiles]       = useState([])
  const specialistsDrag = useDragScroll()
  const newsDrag        = useDragScroll()

  return (
    <div style={{ width: '100%', height: '100%', background: c.white, display: 'flex', flexDirection: 'column', fontFamily: inter, position: 'relative' }}>

      {/* Status Bar — always visible */}
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

      {/* View — fades in on each switch */}
      <div key={view} className="animate-in fade-in duration-200" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {view === 'home' && (
          <>
            {/* NavBar */}
            <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 16, background: c.white }}>
              <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Menu size={24} strokeWidth={1.75} color={c.textPri} />
              </button>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', gap: 3.4, alignItems: 'center' }}>
                <span style={{ fontFamily: quicksand, fontWeight: 700, fontSize: 15.2, letterSpacing: '1.27px', color: c.blueDeep, whiteSpace: 'nowrap' }}>ASTEA</span>
                <span style={{ fontFamily: quicksand, fontWeight: 700, fontSize: 15.2, letterSpacing: '1.27px', color: c.green, whiteSpace: 'nowrap' }}>MED</span>
              </div>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => setView('notifications')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <Bell size={20} strokeWidth={1.75} color={c.textPri} />
                {hasNotification && (
                  <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#e53935', border: `1.5px solid ${c.white}` }} />
                )}
              </button>
            </div>

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
                      <button
                        key={qa.label}
                        className="transition-all duration-150 active:scale-[0.96]"
                        onClick={qa.newRequest ? () => setView('newrequest') : undefined}
                        style={{ ...card, borderRadius: 8, flex: 1, height: 88, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 6, cursor: 'pointer' }}
                      >
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
              <button
                className="transition-all duration-150 active:scale-[0.98]"
                onClick={() => setView('newrequest')}
                style={{ width: '100%', height: 44, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={L2({ color: c.white, textAlign: 'center' })}>New request</span>
              </button>
            </div>
          </>
        )}

        {view === 'newrequest' && (
          <RequestTypeView onBack={() => setView('home')} onConsultation={() => setView('consultation')} onDocument={() => setView('document')} />
        )}

        {view === 'document' && (
          <DocumentRequestView onBack={() => setView('newrequest')} />
        )}

        {view === 'consultation' && (
          <ConsultationSymptomsView
            onBack={() => setView('newrequest')}
            onContinue={() => setView('upload')}
            symptoms={consultSymptoms}
            setSymptoms={setConsultSymptoms}
            duration={consultDuration}
            setDuration={setConsultDuration}
            description={consultDescription}
            setDescription={setConsultDescription}
          />
        )}

        {view === 'upload' && (
          <UploadFilesView
            onBack={() => setView('consultation')}
            onContinue={() => setView('review')}
            files={consultFiles}
            setFiles={setConsultFiles}
          />
        )}

        {view === 'review' && (
          <ReviewAndSendView
            onBack={() => setView('upload')}
            onEdit={() => setView('consultation')}
            onSubmit={() => { setView('success'); setHasNotification(true) }}
            symptoms={consultSymptoms}
            duration={consultDuration}
            description={consultDescription}
            files={consultFiles}
          />
        )}

        {view === 'success' && (
          <SubmitSuccessView onHome={() => setView('home')} />
        )}

        {view === 'notifications' && (
          <NotificationsView
            onClose={() => { setView('home'); setHasNotification(false) }}
            onReply={() => setView('doctorsreply')}
          />
        )}

        {view === 'doctorsreply' && (
          <DoctorsReplyView
            onBack={() => setView('notifications')}
            onClose={() => { setView('home'); setHasNotification(false) }}
            onBookAppointment={() => setView('bookappointment')}
          />
        )}

        {view === 'bookappointment' && (
          <BookAppointmentView
            onBack={() => setView('doctorsreply')}
            onConfirm={(slot) => { setBookedSlot(slot); setView('appointmentbooked') }}
          />
        )}

        {view === 'appointmentbooked' && (
          <AppointmentBookedView slot={bookedSlot} onHome={() => setView('home')} />
        )}

      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 }}
          />
          {/* Drawer */}
          <div
            className="animate-in slide-in-from-left duration-250"
            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 280, background: c.white, zIndex: 201, display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div style={{ padding: '20px 16px 16px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar src={avatarPatient} size={44} radius={24} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 15, color: c.textPri, whiteSpace: 'nowrap' }}>Peter Ivanov</span>
                <span style={L4({ color: c.textSec })}>Patient</span>
              </div>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
                <X size={18} strokeWidth={1.75} color={c.textSec} />
              </button>
            </div>

            {/* Nav items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
              {[
                { icon: <FileText size={18} strokeWidth={1.5} color={c.textSec} />,  label: 'My Records' },
                { icon: <Calendar  size={18} strokeWidth={1.5} color={c.textSec} />,  label: 'Appointments' },
                { icon: <Archive   size={18} strokeWidth={1.5} color={c.textSec} />,  label: 'Prescriptions' },
                { icon: <Users     size={18} strokeWidth={1.5} color={c.textSec} />,  label: 'My Specialists' },
                { icon: <Settings  size={18} strokeWidth={1.5} color={c.textSec} />,  label: 'Settings' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  {icon}
                  <span style={L3({ color: c.textPri })}>{label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div style={{ borderTop: `1px solid ${c.border}`, padding: '8px 0 32px' }}>
              <button
                onClick={onBack}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <LogOut size={18} strokeWidth={1.5} color="#e53935" />
                <span style={L3({ color: '#e53935' })}>Log out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
