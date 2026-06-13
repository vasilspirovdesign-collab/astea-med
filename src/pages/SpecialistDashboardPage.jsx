import { useState, useEffect } from 'react'
import logoIcon    from '../assets/logo-icon.svg'
import avatarIvanova from '../assets/avatar-ivanova.png'
import avatarPatient from '../assets/avatar-patient.png'
import avatar1 from '../assets/avatar-1.png'
import avatar2 from '../assets/avatar-2.png'
import avatar3 from '../assets/avatar-3.png'
import avatar4 from '../assets/avatar-4.png'
import photoTemp     from '../assets/photo-temp.jpg'
import photoPassport from '../assets/photo-passport.jpg'

// ─── Design tokens ─────────────────────────────────────────────────────────────
const c = {
  blue:      '#245dcf',
  green:     '#1d9e75',
  textPri:   '#0d0d0d',
  textSec:   '#717177',
  border:    '#e5e5e9',
  white:     '#ffffff',
  surface:   '#f8f8f8',
  beige:     '#edebe4',
  greenTint: '#f6fdfb',
  amberTint: '#fffbf5',
  amber:     '#ec9509',
  red:       '#641723',
}

const quicksand = '"Quicksand", sans-serif'
const inter     = 'Inter, sans-serif'

// ─── Shared ────────────────────────────────────────────────────────────────────
const STATUS_STYLE = {
  'New':         { bg: c.greenTint, border: c.green, color: c.green },
  'In progress': { bg: c.amberTint, border: c.amber, color: c.amber },
  'Closed':      { bg: c.amberTint, border: c.red,   color: c.red   },
}

const ROWS = [
  {
    name: 'Peter Ivanov',    avatar: avatarPatient, type: 'Consultation', submitted: '2 min ago',  status: 'New',         priority: 'Urgent',
    symptoms: ['Fever', 'Cough', 'Fatigue'],
    details: [
      { label: 'Type',        value: 'Consultation' },
      { label: 'Symptoms',    value: 'Fever, Cough, Fatigue' },
      { label: 'Duration',    value: '2-3 days' },
      { label: 'Description', value: 'Temperature up to 38.5°C, dry cough...' },
    ],
    info: [
      { label: 'DOB',        value: '14 Mar 1987' },
      { label: 'ID',         value: '8703142345' },
      { label: 'GP since',   value: 'Jan 2022' },
      { label: 'Blood type', value: 'A+' },
      { label: 'Allergies',  value: 'None recorded' },
    ],
  },
  {
    name: 'Maria Georgieva', avatar: avatar1,        type: 'Sick note',    submitted: '18 min ago', status: 'New',         priority: null,
    symptoms: ['Headache', 'Nausea'],
    details: [
      { label: 'Type',        value: 'Sick note' },
      { label: 'Symptoms',    value: 'Headache, Nausea' },
      { label: 'Duration',    value: '1 day' },
      { label: 'Description', value: 'Severe migraine, unable to work...' },
    ],
    info: [
      { label: 'DOB',        value: '22 Jul 1992' },
      { label: 'ID',         value: '9207225678' },
      { label: 'GP since',   value: 'Mar 2020' },
      { label: 'Blood type', value: 'B+' },
      { label: 'Allergies',  value: 'Penicillin' },
    ],
  },
  {
    name: 'Yoana Dimitrova', avatar: avatar2,        type: 'Prescription', submitted: '1 hr ago',   status: 'New',         priority: null,
    symptoms: ['Back pain', 'Stiffness'],
    details: [
      { label: 'Type',        value: 'Prescription' },
      { label: 'Symptoms',    value: 'Back pain, Stiffness' },
      { label: 'Duration',    value: '1 week' },
      { label: 'Description', value: 'Chronic lower back pain, needs renewal...' },
    ],
    info: [
      { label: 'DOB',        value: '05 Nov 1985' },
      { label: 'ID',         value: '8511054321' },
      { label: 'GP since',   value: 'Jun 2019' },
      { label: 'Blood type', value: 'O-' },
      { label: 'Allergies',  value: 'Ibuprofen' },
    ],
  },
  {
    name: 'Boris Nikolov',   avatar: avatar3,        type: 'Consultation', submitted: '3 hr ago',   status: 'In progress', priority: null,
    symptoms: ['Chest pain', 'Shortness of breath'],
    details: [
      { label: 'Type',        value: 'Consultation' },
      { label: 'Symptoms',    value: 'Chest pain, Shortness of breath' },
      { label: 'Duration',    value: '4 hours' },
      { label: 'Description', value: 'Intermittent chest tightness after exercise...' },
    ],
    info: [
      { label: 'DOB',        value: '18 Feb 1979' },
      { label: 'ID',         value: '7902181234' },
      { label: 'GP since',   value: 'Sep 2018' },
      { label: 'Blood type', value: 'AB+' },
      { label: 'Allergies',  value: 'Aspirin' },
    ],
  },
  {
    name: 'Elena Todorova',  avatar: avatar4,        type: 'Referral',     submitted: 'Yesterday',  status: 'Closed',      priority: null,
    symptoms: ['Dizziness', 'Blurred vision'],
    details: [
      { label: 'Type',        value: 'Referral' },
      { label: 'Symptoms',    value: 'Dizziness, Blurred vision' },
      { label: 'Duration',    value: '3 days' },
      { label: 'Description', value: 'Referred to neurologist for evaluation...' },
    ],
    info: [
      { label: 'DOB',        value: '30 Sep 1995' },
      { label: 'ID',         value: '9509309876' },
      { label: 'GP since',   value: 'Feb 2021' },
      { label: 'Blood type', value: 'A-' },
      { label: 'Allergies',  value: 'None recorded' },
    ],
  },
]

function PatientAvatar({ src, size = 32, radius = 16 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius, flexShrink: 0, overflow: 'hidden', border: `1px solid ${c.border}` }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  )
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
const NAV = ['Requests', 'Schedule', 'Patients', 'Messages', 'Documents']

function Sidebar({ onLogout, activeNav = 'Requests' }) {
  return (
    <div style={{ width: 240, flexShrink: 0, height: '100%', display: 'flex', flexDirection: 'column', borderRight: `1px solid ${c.border}`, background: c.white }}>
      <div style={{ height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7.8 }}>
          <img src={logoIcon} alt="" style={{ width: 39, height: 39, display: 'block', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5.2 }}>
              <span style={{ fontFamily: quicksand, fontWeight: 700, fontSize: 23.4, letterSpacing: '1.95px', color: c.blue, lineHeight: 1 }}>ASTEA</span>
              <span style={{ fontFamily: quicksand, fontWeight: 700, fontSize: 23.4, letterSpacing: '1.95px', color: c.green, lineHeight: 1 }}>MED</span>
            </div>
            <span style={{ fontFamily: quicksand, fontWeight: 500, fontSize: 7.2, letterSpacing: '0.49px', color: c.textSec, textTransform: 'uppercase', lineHeight: 1 }}>DOCTOR PORTAL</span>
          </div>
        </div>
      </div>
      {NAV.map((label) => {
        const active = label === activeNav
        return (
          <div key={label} style={{ height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: active ? c.surface : 'transparent', cursor: 'pointer' }}>
            <span style={{ fontFamily: quicksand, fontWeight: active ? 600 : 500, fontSize: 13, lineHeight: '18px', color: active ? c.textPri : c.textSec }}>{label}</span>
            {active && label === 'Requests' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.green }} />}
          </div>
        )
      })}
      <div style={{ flex: 1 }} />
      <div style={{ borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', flexShrink: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 22, overflow: 'hidden', flexShrink: 0 }}>
          <img src={avatarIvanova} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 13, color: c.textPri, whiteSpace: 'nowrap' }}>Dr. Ivanova</span>
          <span onClick={onLogout} style={{ fontFamily: inter, fontWeight: 400, fontSize: 11, color: c.textSec, whiteSpace: 'nowrap', cursor: 'pointer' }}>Log out</span>
        </div>
      </div>
    </div>
  )
}

// ─── List view ─────────────────────────────────────────────────────────────────
function ListView({ onView }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['New (3)', true], ['In progress (2)', false], ['Closed', false]].map(([label, active]) => (
            <div key={label} style={{ height: 34, display: 'flex', alignItems: 'center', padding: '0 12px', borderRadius: 6, background: active ? c.blue : c.surface, cursor: 'pointer' }}>
              <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 11, lineHeight: '18px', color: active ? c.white : c.textSec, whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ height: 32, display: 'flex', alignItems: 'center', padding: '0 12px', border: `1px solid ${c.border}`, borderRadius: 8, width: 260 }}>
          <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec }}>Search requests...</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', height: 39, background: c.surface }}>
          {[['PATIENT', 260], ['TYPE', 160], ['SUBMITTED', 180], ['STATUS', 140], ['PRIORITY', 140]].map(([col, w]) => (
            <div key={col} style={{ width: w, flexShrink: 0, padding: '0 16px' }}>
              <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>{col}</span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
        </div>
        <div style={{ height: 1, background: c.border }} />
        {ROWS.map((row, i) => {
          const st = STATUS_STYLE[row.status]
          return (
            <div key={row.name}>
              <div style={{ display: 'flex', alignItems: 'center', height: 64, background: c.white }}>
                <div style={{ width: 260, flexShrink: 0, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <PatientAvatar src={row.avatar} />
                  <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textPri, whiteSpace: 'nowrap' }}>{row.name}</span>
                </div>
                <div style={{ width: 160, flexShrink: 0, padding: '0 16px' }}>
                  <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec }}>{row.type}</span>
                </div>
                <div style={{ width: 180, flexShrink: 0, padding: '0 16px' }}>
                  <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec }}>{row.submitted}</span>
                </div>
                <div style={{ width: 140, flexShrink: 0, padding: '0 16px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 8px', borderRadius: 4, background: st.bg, border: `1px solid ${st.border}` }}>
                    <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 12, color: st.color, whiteSpace: 'nowrap' }}>{row.status}</span>
                  </div>
                </div>
                <div style={{ width: 140, flexShrink: 0, padding: '0 16px' }}>
                  {row.priority && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 6, background: c.textPri }}>
                      <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 12, color: c.white, whiteSpace: 'nowrap' }}>{row.priority}</span>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, padding: '0 16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => onView(row)} style={{ height: 36, padding: '0 20px', border: `1px solid ${c.border}`, borderRadius: 8, background: c.white, cursor: 'pointer' }}>
                    <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri }}>View</span>
                  </button>
                </div>
              </div>
              {i < ROWS.length - 1 && <div style={{ height: 1, background: c.border }} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Detail view ───────────────────────────────────────────────────────────────

function DetailView({ row, onContact, onDecision }) {
  return (
    <>
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span onClick={() => history.back()} style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec, cursor: 'pointer' }}>← Back to requests</span>

        {/* Two columns */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* Patient card */}
          <div style={{ flex: 1, border: `1px solid ${c.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <PatientAvatar src={row.avatar} size={40} radius={22} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri }}>{row.name}</span>
                <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec }}>{row.type} · Submitted {row.submitted}</span>
              </div>
              {row.priority && (
                <div style={{ padding: '4px 10px', borderRadius: 6, background: c.textPri, flexShrink: 0 }}>
                  <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 12, color: c.white }}>{row.priority}</span>
                </div>
              )}
            </div>

            <div style={{ height: 1, background: c.border }} />

            {/* Symptoms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>SYMPTOMS</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {row.symptoms.map(s => (
                  <div key={s} style={{ padding: '6px 12px', borderRadius: 14, background: c.blue }}>
                    <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 12, color: c.white }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>DETAILS</span>
              <div style={{ border: `1px solid ${c.border}`, borderRadius: 8, overflow: 'hidden' }}>
                {row.details.map((d, i) => (
                  <div key={d.label}>
                    {i > 0 && <div style={{ height: 1, background: c.border }} />}
                    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 11, lineHeight: '18px', color: c.textSec }}>{d.label}</span>
                      <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 14, color: c.textPri }}>{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>PHOTOS &amp; ATTACHMENTS</span>
              <div style={{ display: 'flex', gap: 12 }}>
                {[{ src: photoTemp, name: 'Temp.jpg' }, { src: photoPassport, name: 'medicalpassport.jpg' }].map(p => (
                  <div key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', border: `1px solid ${c.border}` }}>
                      <img src={p.src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', color: c.textPri, textAlign: 'center', maxWidth: 80, wordBreak: 'break-word' }}>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions card */}
          <div style={{ width: 432, flexShrink: 0, border: `1px solid ${c.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>PATIENT INFO</span>
            {row.info.map((item, i) => (
              <div key={item.label}>
                {i > 0 && <div style={{ height: 1, background: c.border }} />}
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>{item.label}</span>
                  <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 14, color: c.textPri }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{ flexShrink: 0, borderTop: `1px solid ${c.border}`, padding: '10px 24px', display: 'flex', justifyContent: 'flex-end', gap: 12, background: c.white }}>
        <button onClick={onContact} style={{ height: 44, padding: '0 16px', border: `1.5px solid ${c.border}`, borderRadius: 8, background: c.white, cursor: 'pointer' }}>
          <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri }}>Contact patient</span>
        </button>
        <button onClick={onDecision} style={{ height: 44, padding: '0 16px', border: 'none', borderRadius: 8, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', cursor: 'pointer', minWidth: 214 }}>
          <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.white }}>Make decision</span>
        </button>
      </div>
    </>
  )
}

// ─── Recommendations view ──────────────────────────────────────────────────────
const FOLLOW_UP_OPTIONS = ['3 days', '1 week', '2 weeks', 'If worsens']

function RecommendationsView({ row, onBack }) {
  const [followUp, setFollowUp] = useState('1 week')
  return (
    <>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span onClick={onBack} style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec, cursor: 'pointer' }}>← Back</span>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* Form card */}
          <div style={{ flex: 1, border: `1px solid ${c.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, background: c.white }}>
            {/* Diagnosis summary */}
            <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>DIAGNOSIS SUMMARY</span>
            <div style={{ height: 100, border: `1px solid ${c.border}`, borderRadius: 8, padding: 12, background: c.white }}>
              <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: '#b2b2b8' }}>e.g. Viral upper respiratory infection</span>
            </div>

            <div style={{ height: 1, background: c.border }} />

            {/* Next steps */}
            <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>NEXT STEPS FOR PATIENT</span>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, flexShrink: 0, border: `1px solid ${c.border}`, background: c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 12, color: c.textPri }}>{n}</span>
                </div>
                <div style={{ flex: 1, height: 38, border: `1px solid ${c.border}`, borderRadius: 8, background: c.surface, padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, color: c.border }}>Add step {n}...</span>
                </div>
              </div>
            ))}

            <div style={{ height: 1, background: c.border }} />

            {/* Follow-up */}
            <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>FOLLOW-UP</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FOLLOW_UP_OPTIONS.map(opt => {
                const active = followUp === opt
                return (
                  <div key={opt} onClick={() => setFollowUp(opt)} style={{ padding: '6px 12px', borderRadius: 14, background: active ? c.blue : c.white, border: `1px solid ${active ? c.blue : c.border}`, cursor: 'pointer' }}>
                    <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 12, color: active ? c.white : c.textSec }}>{opt}</span>
                  </div>
                )
              })}
            </div>

            <div style={{ height: 1, background: c.border }} />

            {/* Internal notes */}
            <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>INTERNAL NOTES (not shown to patient)</span>
            <div style={{ height: 100, border: `1px solid ${c.border}`, borderRadius: 8, padding: 12, background: c.white }}>
              <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: '#b2b2b8' }}>Optional internal notes...</span>
            </div>
          </div>

          {/* Patient summary */}
          <div style={{ width: 412, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Patient card */}
            <div style={{ height: 72, border: `1px solid ${c.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', background: c.white }}>
              <PatientAvatar src={row.avatar} size={40} radius={22} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri, whiteSpace: 'nowrap' }}>{row.name}</span>
                <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 11, lineHeight: '18px', color: c.textSec, whiteSpace: 'nowrap' }}>{row.type} · active</span>
              </div>
            </div>

            <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>PATIENT SUMMARY</span>
            <div style={{ border: `1px solid ${c.border}`, borderRadius: 8, overflow: 'hidden' }}>
              {row.details.map((d, i) => (
                <div key={d.label}>
                  {i > 0 && <div style={{ height: 1, background: c.border }} />}
                  <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>{d.label}</span>
                    <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 14, color: c.textPri }}>{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{ flexShrink: 0, borderTop: `1px solid ${c.border}`, padding: '10px 24px', display: 'flex', justifyContent: 'flex-end', gap: 12, background: c.white }}>
        <button style={{ height: 44, padding: '0 16px', border: `1.5px solid ${c.border}`, borderRadius: 8, background: c.white, cursor: 'pointer' }}>
          <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri }}>Save draft</span>
        </button>
        <button style={{ height: 44, padding: '0 16px', border: 'none', borderRadius: 8, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', cursor: 'pointer', minWidth: 120 }}>
          <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.white }}>Submit</span>
        </button>
      </div>
    </>
  )
}

// ─── Decision view ─────────────────────────────────────────────────────────────
const OUTCOMES = [
  { id: 'self-care',  label: 'No visit — self-care',   sub: 'Write recommendations & next steps' },
  { id: 'visit',      label: 'Physical visit needed',   sub: 'Offer available appointment slots' },
  { id: 'document',   label: 'Issue document',          sub: 'Sick leave, referral or prescription' },
  { id: 'emergency',  label: 'Emergency referral',      sub: 'Refer to emergency services immediately' },
]

function DecisionView({ onBack, onContinue }) {
  const [selected, setSelected] = useState('self-care')
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span onClick={onBack} style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec, cursor: 'pointer' }}>← Back to request</span>
      {/* Centered card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 484, border: `1px solid ${c.border}`, borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', gap: 16, background: c.white }}>
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 20, color: c.textPri }}>Select outcome</span>
            <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec }}>Choose the appropriate status for this consultation</span>
          </div>
          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {OUTCOMES.map((opt, i) => {
              const active = selected === opt.id
              return (
                <div key={opt.id}>
                  {i > 0 && <div style={{ height: 1, background: c.border }} />}
                  <div onClick={() => setSelected(opt.id)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', cursor: 'pointer' }}>
                    {/* Radio */}
                    <div style={{ width: 20, height: 20, borderRadius: 10, flexShrink: 0, border: `2px solid ${active ? c.blue : c.border}`, background: active ? c.blue : c.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {active && <div style={{ width: 8, height: 8, borderRadius: 4, background: c.white }} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri }}>{opt.label}</span>
                      <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec }}>{opt.sub}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={() => selected === 'self-care' && onContinue?.()} style={{ height: 44, border: 'none', borderRadius: 8, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', cursor: 'pointer', width: '100%' }}>
              <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.white }}>Continue</span>
            </button>
            <button onClick={onBack} style={{ height: 44, border: `1.5px solid ${c.border}`, borderRadius: 8, background: c.white, cursor: 'pointer', width: '100%' }}>
              <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri }}>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Messages view ─────────────────────────────────────────────────────────────
const QUICK_REPLIES = ['Any allergies?', 'How long exactly?', 'Any other symptoms?', 'Attach a photo']

function MessagesView({ row }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span onClick={() => history.back()} style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec, cursor: 'pointer' }}>← Back</span>

      {/* Patient card */}
      <div style={{ width: 358, height: 72, border: `1px solid ${c.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', background: c.white }}>
        <PatientAvatar src={row.avatar} size={40} radius={22} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
          <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.textPri, whiteSpace: 'nowrap' }}>{row.name}</span>
          <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 11, lineHeight: '18px', color: c.textSec, whiteSpace: 'nowrap' }}>{row.type} · active</span>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ width: 712, border: `1px solid ${c.border}`, borderRadius: 8, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 300 }}>
        {/* Doctor bubble (right) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
            <div style={{ maxWidth: 480, padding: '12px 16px', borderRadius: 12, background: c.greenTint, border: `1px solid ${c.border}` }}>
              <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 14, color: c.textPri }}>Has the fever been continuous or intermittent?</span>
            </div>
            <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 11, color: c.textSec }}>Dr. Ivanova · 10:32</span>
          </div>
        </div>
        {/* Patient bubble (left) */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ maxWidth: 400, padding: '12px 16px', borderRadius: 12, background: c.surface, border: `1px solid ${c.border}` }}>
              <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 14, color: c.textPri }}>Mostly continuous, gets worse at night.</span>
            </div>
            <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 11, color: c.textSec }}>{row.name.split(' ')[0]} · 10:35</span>
          </div>
        </div>
      </div>

      {/* Quick replies */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 10, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.textSec }}>QUICK REPLIES</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {QUICK_REPLIES.map(r => (
            <div key={r} style={{ padding: '4px 10px', borderRadius: 20, background: c.surface, border: `1px solid ${c.border}`, cursor: 'pointer' }}>
              <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 12, color: c.textPri }}>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compose */}
      <div style={{ width: 712, border: `1px solid ${c.border}`, borderRadius: 8, padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center', background: c.white }}>
        <div style={{ flex: 1, height: 44, padding: '0 12px', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: inter, fontWeight: 400, fontSize: 13, lineHeight: '18px', color: c.textSec }}>Type a message...</span>
        </div>
        <button style={{ width: 135, height: 44, border: 'none', borderRadius: 8, background: 'linear-gradient(180deg, #245dcf 0%, #122f69 100%)', cursor: 'pointer' }}>
          <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 16, lineHeight: '20px', color: c.white }}>Send</span>
        </button>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const TOP_BAR_TITLE = { list: 'Patient Requests', detail: 'Patient Requests', messages: 'Message Patient', decision: 'Close consultation', recommendations: 'Write Recommendations' }
const ACTIVE_NAV    = { list: 'Requests', detail: 'Requests', messages: 'Messages', decision: 'Requests', recommendations: 'Requests' }

export default function SpecialistDashboardPage({ onBack, onLogout }) {
  const [view, setView] = useState('list')
  const [selectedRow, setSelectedRow] = useState(null)

  function openDetail(row) {
    setSelectedRow(row)
    history.pushState({ persona: 'specialist', specialistView: 'detail' }, '')
    setView('detail')
  }

  function openMessages() {
    history.pushState({ persona: 'specialist', specialistView: 'messages' }, '')
    setView('messages')
  }

  function openDecision() {
    history.pushState({ persona: 'specialist', specialistView: 'decision' }, '')
    setView('decision')
  }

  function openRecommendations() {
    history.pushState({ persona: 'specialist', specialistView: 'recommendations' }, '')
    setView('recommendations')
  }

  useEffect(() => {
    function onPop(e) {
      const sv = e.state?.specialistView
      if (sv === 'detail')              setView('detail')
      else if (sv === 'messages')       setView('messages')
      else if (sv === 'decision')       setView('decision')
      else if (sv === 'recommendations') setView('recommendations')
      else                              setView('list')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100dvh', fontFamily: inter, background: c.white, overflow: 'hidden' }}>
      <Sidebar onLogout={onLogout} activeNav={ACTIVE_NAV[view]} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
        {/* TopBar */}
        <div style={{ height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: `1px solid ${c.border}`, background: c.white }}>
          <span style={{ fontFamily: quicksand, fontWeight: 600, fontSize: 20, color: c.textPri }}>{TOP_BAR_TITLE[view]}</span>
        </div>
        {view === 'list'     && <ListView onView={openDetail} />}
        {view === 'detail'   && <DetailView row={selectedRow} onContact={openMessages} onDecision={openDecision} />}
        {view === 'messages' && <MessagesView row={selectedRow} />}
        {view === 'decision'         && <DecisionView onBack={() => history.back()} onContinue={openRecommendations} />}
        {view === 'recommendations'  && <RecommendationsView row={selectedRow} onBack={() => history.back()} />}
      </div>
    </div>
  )
}
