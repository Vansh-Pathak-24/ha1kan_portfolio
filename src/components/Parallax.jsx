import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SCRUB } from '../lib/lenis'

// Moves its content against the scroll. Outer div is the trigger (never moves),
// inner div is what travels. speed 0.1 ~ 10% of the viewport height each way.
const Parallax = ({ children, speed = 0.1, className = '' }) => {
  const outer = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { y: () => -innerHeight * speed },
        {
          y: () => innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: outer.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        }
      )
    }, outer)
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={outer} className={className}>
      <div ref={inner}>{children}</div>
    </div>
  )
}

export default Parallax
