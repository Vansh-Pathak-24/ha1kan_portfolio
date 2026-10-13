import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTarget } from '../lib/lenis'
import { site } from '../lib/site'
import SectionHead from '../components/SectionHead'
import Roll from '../components/Roll'
import { Arrow } from '../components/Icons'

gsap.registerPlugin(ScrollTrigger)
const C = site.contact

const Contact = () => {
  const mark = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.letter', {
        yPercent: 100,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: mark.current, start: 'top 95%' },
      })
    }, mark)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="relative z-10 bg-black text-white">
      <SectionHead ch="02" title={C.label} dark />

      <div className="relative overflow-hidden">
        <div className="speed" />
        <div className="container relative pb-12 pt-28 md:pb-16 md:pt-52">
          {C.prompt && (
            <p className="max-w-[22rem] border-[3px] border-white bg-black p-3 text-[clamp(0.95rem,1.3vw,1.25rem)] font-medium leading-[1.12] tracking-[-0.03em] shadow-[5px_5px_0_#fff]">
              {C.prompt}
            </p>
          )}
        </div>
      </div>

      <a
        href={`mailto:${site.email}`}
        data-cursor={C.cursor}
        className="fill fill-dark group block border-y-[3px] border-white"
      >
        <div className="container flex items-center justify-between gap-4 py-7 md:gap-8 md:py-12">
          <span className="min-w-0 text-[clamp(1.75rem,8.4vw,9rem)] font-medium leading-[0.9] tracking-[-0.07em]">
            <Roll step={10} loose>
              {site.email}
            </Roll>
          </span>
          <span className="shrink-0 text-[clamp(1.5rem,5vw,4.5rem)]">
            <Arrow />
          </span>
        </div>
      </a>

      <div className="container grid md:grid-cols-3">
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="fill fill-dark group flex items-center justify-between border-b-[3px] border-white py-6 font-mono text-xs uppercase leading-none md:border-b-0 md:border-l-[3px] md:px-5 md:first:border-l-0 md:first:pl-0"
          >
            <Roll>{s.label}</Roll>
            <Arrow />
          </a>
        ))}
      </div>

      <div className="container border-t-[3px] border-white pt-6">
        <div
          ref={mark}
          aria-label={site.name}
          className="flex select-none overflow-hidden text-[clamp(6rem,27vw,26rem)] font-semibold leading-[0.78] tracking-[-0.08em]"
        >
          {site.name.split('').map((c, i) => (
            <span key={i} className="letter inline-block">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t-[3px] border-white">
        <div className="container flex items-center justify-between py-3 font-mono text-xs uppercase leading-none">
          <span>{site.footer.left}</span>
          <button onClick={() => scrollToTarget(0, { duration: 2 })} className="group inline-flex items-center gap-2 py-2">
            <Roll>{site.labels.top}</Roll>
            <Arrow dir="n" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
