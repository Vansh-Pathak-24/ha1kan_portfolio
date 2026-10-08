import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// element leans toward the cursor and snaps back with elastic
const Magnetic = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    const x = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.4)' })
    const y = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * strength)
      y((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      x(0)
      y(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}

export default Magnetic
