const Roll = ({ children, step = 16, loose = false, className = '' }) => (
  <span className={`roll ${loose ? 'roll-loose' : ''} ${className}`} aria-label={children}>
    {[...String(children)].map((c, i) => (
      <span key={i} aria-hidden="true" className="roll-c" style={{ '--d': `${i * step}ms` }}>
        <span className="roll-a">{c}</span>
        <span className="roll-b">{c}</span>
      </span>
    ))}
  </span>
)

export default Roll
