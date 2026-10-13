import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { lenis, markLoaded } from '../lib/lenis'
import { site } from '../lib/site'

const Preloader = () => {
  const root = useRef(null)
  const num = useRef(null)

  useEffect(() => {
    lenis.stop()
    const c = { v: 0 }
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .to(c, {
          v: 100,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: () => (num.current.textContent = String(Math.round(c.v)).padStart(3, '0')),
        })
        .to(root.current, {
          yPercent: -100,
          duration: 1.1,
          ease: 'expo.inOut',
          delay: 0.2,
          onStart: markLoaded,
          onComplete: () => {
            lenis.start()
            root.current.style.display = 'none'
          },
        })
    }, root)
    return () => {
      ctx.revert()
      lenis.start()
    }
  }, [])

  return (
    <div
      ref={root}
      data-preloader
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-black p-[var(--page-padding)] text-white"
    >
      <span className="font-mono text-lg tracking-[-0.05em]">{site.name}</span>
      <span
        ref={num}
        className="tnum text-[clamp(7rem,26vw,28rem)] font-medium leading-[0.75] tracking-[-0.08em]"
      >
        000
      </span>
    </div>
  )
}

export default Preloader
