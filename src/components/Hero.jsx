import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SCRUB } from '../lib/lenis'
import { site } from '../lib/site'
import Liquid from './Liquid'

const Hero = () => {
  const root = useRef(null)
  const base = useRef(window.__loaded ? 0.5 : 2.3).current

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: SCRUB }
      gsap.to('.hero-head', { y: () => innerHeight * 0.14, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-top', { y: () => innerHeight * 0.28, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col pt-14">
      <div className="frame relative isolate flex flex-1 flex-col justify-between overflow-hidden bg-white">
        <div className="halftone" />
        <div className="hero-top container relative z-10 flex justify-start pt-6 text-black md:justify-end md:pt-8">
          <p
            className="fadeup max-w-[22rem] border-[3px] border-black bg-white p-3 text-[clamp(0.95rem,1.3vw,1.25rem)] font-medium leading-[1.12] tracking-[-0.03em] shadow-[5px_5px_0_#000]"
            style={{ '--delay': `${base + 0.8}s` }}
          >
            {site.hero.intro}
          </p>
        </div>

        <div className="hero-head container relative z-10 pb-8 pt-20 text-black md:pb-12 md:pt-24">
          <h1 className="text-[clamp(2.1rem,10.4vw,10.5rem)] font-medium italic leading-[0.88] tracking-[-0.07em]">
            {site.hero.lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.1em]">
                <span className="rise block" style={{ '--delay': `${base + i * 0.12}s` }}>
                  {l}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <Liquid />
      </div>
    </section>
  )
}

export default Hero
