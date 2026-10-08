import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Inverting square cursor.
//  - over links: opens into a hollow ring (text underneath stays readable)
//  - over [data-cursor="View"]: bigger ring with a label inside
//  - also sets the entry/exit side for .fill hovers, so the black wipe comes in
//    from the edge your pointer entered and leaves through the edge it exited
const Cursor = () => {
  const pos = useRef(null)
  const dot = useRef(null)
  const lab = useRef(null)

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')

    const x = gsap.quickTo(pos.current, 'x', { duration: 0.2, ease: 'power3' })
    const y = gsap.quickTo(pos.current, 'y', { duration: 0.2, ease: 'power3' })
    let shown = false
    let mode = ''

    const move = (e) => {
      if (!shown) {
        shown = true
        pos.current.style.opacity = 1
      }
      x(e.clientX)
      y(e.clientY)
    }

    let last = null
    const apply = (target) => {
      last = target
      const t = target.closest?.('[data-cursor],a,button')
      const label = t?.dataset?.cursor || ''
      const key = label ? 'L' + label : t ? 'link' : ''
      if (key === mode) return
      mode = key
      const size = label ? 84 : t ? 48 : 12
      if (label) lab.current.textContent = label
      gsap.to(dot.current, {
        width: size,
        height: size,
        backgroundColor: t ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,1)',
        duration: 0.45,
        ease: 'expo.out',
      })
      gsap.to(lab.current, { opacity: label ? 1 : 0, duration: 0.3 })
    }
    const over = (e) => apply(e.target)
    const click = () => {
      mode = ''
      requestAnimationFrame(() => last && apply(last))
    }

    const side = (e) => {
      const el = e.target.closest?.('.fill')
      if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--o', e.clientY < r.top + r.height / 2 ? '0%' : '100%')
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over)
    window.addEventListener('click', click)
    document.addEventListener('pointerover', side)
    document.addEventListener('pointerout', side)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('click', click)
      document.removeEventListener('pointerover', side)
      document.removeEventListener('pointerout', side)
    }
  }, [])

  return (
    <div ref={pos} className="pointer-events-none fixed left-0 top-0 z-[300] opacity-0 mix-blend-difference">
      <div
        ref={dot}
        className="relative h-3 w-3 -translate-x-1/2 -translate-y-1/2 border-2 border-white bg-white"
      >
        <span
          ref={lab}
          className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-wide text-white opacity-0"
        />
      </div>
    </div>
  )
}

export default Cursor
