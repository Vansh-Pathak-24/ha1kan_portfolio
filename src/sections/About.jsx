import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { site } from '../lib/site'

gsap.registerPlugin(ScrollTrigger)

const { text, highlight } = site.about

const About = () => {
  const p = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.word', {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: p.current, start: 'top 80%', end: 'bottom 55%', scrub: true },
      })
    }, p)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="container py-16 md:py-32">
      <div className="relative border-[3px] border-black bg-white px-5 pb-8 pt-12 shadow-[8px_8px_0_#000] md:px-12 md:pb-14 md:pt-16">
        <span className="absolute -left-[3px] -top-[3px] bg-black px-3 py-2 font-mono text-xs font-bold uppercase italic leading-none text-white">
          About
        </span>
        <p
          ref={p}
          className="text-[clamp(1.85rem,4.7vw,5rem)] font-medium leading-[1] tracking-[-0.065em]"
        >
        {text.split(' ').map((w, i) => {
          const key = w.toLowerCase().replace(/[^a-z]/g, '')
          const mark = highlight.includes(key)
          return (
            <span
              key={i}
              className={`word mr-[0.22em] inline-block opacity-[0.12] ${
                mark ? 'bg-black px-[0.12em] text-white' : ''
              }`}
            >
              {w}
            </span>
          )
        })}
        </p>
      </div>
    </section>
  )
}

export default About
