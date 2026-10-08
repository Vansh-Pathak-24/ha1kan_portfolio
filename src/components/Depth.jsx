import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Perspective section reveal. Each section "opens like a window" and unfolds into
// place: clip-path expands, the card tilts up around its top edge and scales to 1.
// It is TIME-based (plays once the section enters, reverses when you scroll back
// above it) - not scrubbed to scroll - so it can never stall halfway.
// Only the section's top edge is the pivot, so anchor jumps and measurements stay exact.
const small = matchMedia('(max-width: 767px)').matches
const FROM = {
  transformPerspective: 1400,
  transformOrigin: '50% 0%',
  rotateX: small ? -5 : -9,
  scale: small ? 0.97 : 0.95,
  clipPath: small ? 'inset(4vh 3vw 0vh 3vw)' : 'inset(7vh 5vw 0vh 5vw)',
}
const TO = {
  rotateX: 0,
  scale: 1,
  clipPath: 'inset(0vh 0vw 0vh 0vw)',
  duration: 1.5,
  ease: 'expo.out',
}

const Depth = ({ children, dark = false }) => {
  const outer = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tw = gsap.fromTo(inner.current, FROM, { ...TO, paused: true })
      ScrollTrigger.create({
        trigger: outer.current,
        start: 'top 88%',
        onEnter: () => tw.timeScale(1).play(),
        onLeaveBack: () => tw.timeScale(1.8).reverse(),
        // page opened already scrolled past this point (anchor jump): show it, no animation
        onRefresh: (s) => s.progress > 0 && tw.progress() === 0 && tw.progress(1),
      })
    }, outer)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={outer} className="relative">
      <div ref={inner} className={dark ? 'bg-black' : 'bg-white'}>
        {children}
      </div>
    </div>
  )
}

export default Depth
