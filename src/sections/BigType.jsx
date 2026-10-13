import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { site } from '../lib/site'

gsap.registerPlugin(ScrollTrigger)

const row = (site.band.words.join(' — ') + ' — ').repeat(3)
const cls = 'whitespace-nowrap text-[clamp(4.5rem,15vw,16rem)] font-medium leading-[0.85] tracking-[-0.07em]'

const BigType = () => {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.fromTo('.bt-a', { xPercent: 0 }, { xPercent: -15, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.bt-b', { xPercent: -15 }, { xPercent: 0, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden border-y-2 border-black bg-white py-6 md:py-10">
      <div className={`bt-a will-change-transform ${cls}`}>{row}</div>
      <div className={`bt-b will-change-transform type-outline ${cls}`}>{row}</div>
    </section>
  )
}

export default BigType
