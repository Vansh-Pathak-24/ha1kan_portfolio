import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { lenis, SCRUB } from '../lib/lenis'
import { site } from '../lib/site'
import { useGo } from '../lib/useGo'
import TLink from './TLink'
import Magnetic from './Magnetic'
import Roll from './Roll'
import { Plus } from './Icons'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const overlay = useRef(null)
  const head = useRef(null)
  const bar = useRef(null)
  const openRef = useRef(false)
  const first = useRef(true)
  const hiddenRef = useRef(false)
  const { pathname } = useLocation()
  const go = useGo()

  const closeMenu = () => {
    setOpen(false)
    lenis.start()
  }

  useEffect(() => {
    const prog = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: SCRUB } }
    )
    const onScroll = (l) => {
      if (openRef.current || !l.direction) return
      const hide = l.direction === 1 && l.scroll > 240
      if (hide === hiddenRef.current) return
      hiddenRef.current = hide
      gsap.to(head.current, { yPercent: hide ? -101 : 0, duration: 0.55, ease: 'power3.out', overwrite: true })
    }
    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
      prog.scrollTrigger?.kill()
      prog.kill()
    }
  }, [])

  useEffect(() => {
    openRef.current = open
    if (first.current) {
      first.current = false
      return
    }
    const el = overlay.current
    gsap.killTweensOf(el)
    if (open) {
      lenis.stop()
      hiddenRef.current = false
      gsap.to(head.current, { yPercent: 0, duration: 0.3, overwrite: true })
      el.style.visibility = 'visible'
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
      gsap.fromTo(
        el.querySelectorAll('.menu-inner'),
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, delay: 0.35 }
      )
      gsap.fromTo(el.querySelector('.menu-foot'), { opacity: 0 }, { opacity: 1, duration: 0.7, delay: 0.8 })
    } else {
      lenis.start()
      gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.6,
        ease: 'expo.inOut',
        onComplete: () => (el.style.visibility = 'hidden'),
      })
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (!window.__loaded || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target.closest?.('input,textarea')) return
      if (e.key === 'Escape') return closeMenu()
      const k = e.key.toLowerCase()
      if (k === 'm') return setOpen((o) => !o)
      const l = site.nav.find((x) => x.key === k)
      if (l) {
        closeMenu()
        go(l.to, l.label)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <>
      <div
        ref={overlay}
        className="fixed inset-0 z-[90] flex flex-col justify-center bg-black pt-14 text-white"
        style={{ clipPath: 'inset(0% 0% 100% 0%)', visibility: 'hidden' }}
      >
        <nav className="menu-list container">
          {site.nav.map((l) => (
            <div key={l.to} className="overflow-hidden pb-[0.08em]">
              <div className="menu-inner">
                <TLink
                  to={l.to}
                  label={l.label}
                  onClick={closeMenu}
                  className="menu-link group flex items-center text-[clamp(3rem,min(14vw,15svh),12rem)] font-medium leading-[0.9] tracking-[-0.07em]"
                >
                  <Roll step={22} loose>
                    {l.label}
                  </Roll>
                  {l.to === pathname && <span className="ml-[0.2em] block h-[0.13em] w-[0.13em] bg-white" />}
                </TLink>
              </div>
            </div>
          ))}
        </nav>

        <div className="menu-foot container absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] font-mono text-xs uppercase">
          <a href={`mailto:${site.email}`} className="group">
            <Roll>{site.email}</Roll>
          </a>
          <div className="flex gap-5">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group">
                <Roll>{s.label}</Roll>
              </a>
            ))}
          </div>
        </div>
      </div>

      <header
        ref={head}
        className="fixed inset-x-0 top-0 z-[100] flex h-14 items-stretch justify-between border-b-2 border-black/15 bg-white"
      >
        <div
          ref={bar}
          className="pointer-events-none absolute -bottom-[2px] left-0 h-[2px] w-full origin-left bg-black"
          style={{ transform: 'scaleX(0)' }}
        />
        <div className="flex items-center px-[var(--page-padding)]">
          <Magnetic strength={0.4}>
            <TLink
              to="/"
              label={site.nav[0].label}
              onClick={closeMenu}
              className="block font-mono text-lg font-medium leading-none tracking-[-0.05em]"
            >
              {site.name}
            </TLink>
          </Magnetic>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="fill group flex min-w-[7.5rem] items-center justify-between gap-4 border-l-2 border-black px-5 font-mono text-xs uppercase leading-none md:min-w-[9.5rem] md:px-7"
        >
          <Roll>{open ? site.menu.close : site.menu.open}</Roll>
          <Plus open={open} />
        </button>
      </header>
    </>
  )
}

export default Navbar
