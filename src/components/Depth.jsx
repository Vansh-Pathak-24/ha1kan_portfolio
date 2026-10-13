import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
