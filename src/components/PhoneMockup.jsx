export default function PhoneMockup({ children }) {
  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f0f0',
      padding: '32px 20px',
    }}>
      {/* Outer phone body */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        background: 'linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 60%, #111 100%)',
        borderRadius: 56,
        padding: 14,
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.12),
          inset 0 0 0 1px rgba(0,0,0,0.6),
          0 40px 80px rgba(0,0,0,0.45),
          0 16px 32px rgba(0,0,0,0.3)
        `,
      }}>
        {/* Silent switch */}
        <div style={{ position: 'absolute', left: -4, top: 96, width: 4, height: 28, background: '#3a3a3c', borderRadius: '3px 0 0 3px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} />
        {/* Volume up */}
        <div style={{ position: 'absolute', left: -4, top: 140, width: 4, height: 40, background: '#3a3a3c', borderRadius: '3px 0 0 3px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} />
        {/* Volume down */}
        <div style={{ position: 'absolute', left: -4, top: 194, width: 4, height: 40, background: '#3a3a3c', borderRadius: '3px 0 0 3px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} />
        {/* Power */}
        <div style={{ position: 'absolute', right: -4, top: 158, width: 4, height: 72, background: '#3a3a3c', borderRadius: '0 3px 3px 0', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} />

        {/* Screen bezel (inner frame, slightly lighter) */}
        <div style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}>
{/* App content */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
