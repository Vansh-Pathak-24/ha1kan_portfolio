import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { site } from '../lib/site'

gsap.registerPlugin(ScrollTrigger)

const { text, highlight } = site.about // words in `highlight` get underlined

const About = () => {
  const p = useRef(null)

  // words light up as you scroll
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
    <section id="about" className="container py-24 md:py-44">
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
                mark ? 'underline decoration-[0.05em] underline-offset-[0.12em]' : ''
              }`}
            >
              {w}
            </span>
          )
        })}
      </p>
    </section>
  )
}

export default About
