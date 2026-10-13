import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SCRUB } from '../lib/lenis'

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
