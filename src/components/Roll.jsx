// Per-letter roll on hover (put `group` on the parent link/button).
// The clip box is exactly one line tall and the spare copy waits 2px below it,
// so no sliver of the second copy can ever show at rest.
// loose: for big lowercase display type with tight leading - the clip box grows
// (and negative margins cancel it) so ascenders/descenders aren't cut or leaked.
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
