import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_H, scrollToTarget } from '../lib/lenis'
import { site } from '../lib/site'
import TLink from './TLink'
import Roll from './Roll'
import { Arrow, Plus } from './Icons'

gsap.registerPlugin(ScrollTrigger)
const L = site.labels

const Rows = ({ items }) => {
  const ul = useRef(null)
  const timer = useRef(0)
  const [open, setOpen] = useState(-1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.row-title').forEach((el) => {
        gsap.set(el, { yPercent: 110 })
        let shown = false
        const show = (instant) => {
          if (shown) return
          shown = true
          gsap.to(el, { yPercent: 0, duration: instant ? 0 : 1.1, ease: 'expo.out' })
        }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 95%',
          onEnter: () => show(),
          onEnterBack: () => show(),
          onRefresh: (s) => s.progress === 1 && show(true),
        })
      })
    }, ul)
    return () => {
      ctx.revert()
      clearTimeout(timer.current)
    }
  }, [])

  const toggle = (i) => {
    const li = ul.current.children[i]
    const next = open === i ? -1 : i
    if (next !== -1) {
      const prev = open !== -1 && open < i ? ul.current.children[open].querySelector('[data-inner]') : null
      const y = li.getBoundingClientRect().top + window.scrollY - (prev ? prev.scrollHeight : 0) - NAV_H - 16
      scrollToTarget(Math.max(0, y), { offset: 0, duration: 1.2 })
    }
    setOpen(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => ScrollTrigger.refresh(), 950)
  }

  return (
    <ul ref={ul}>
      {items.map((it, i) => {
        const expandable = !!it.desc
        const isOpen = open === i
        const cursor = isOpen ? L.close : it.cursor || (expandable ? L.view : undefined)

        const inner = (
          <div className="container grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 py-7 md:grid-cols-[4rem_1fr_16rem_6rem] md:gap-4 md:py-9">
            <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
            <span className="block min-w-0">
              <span className="block overflow-hidden pb-[0.12em]">
                <span className="row-title block text-[clamp(2.1rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.07em]">
                  <Roll step={14} loose>
                    {it.title}
                  </Roll>
                </span>
              </span>
              <span className="mt-2 block font-mono text-[11px] uppercase opacity-60 md:hidden">{it.meta}</span>
            </span>
            <span className="hidden font-mono text-xs uppercase md:block">{it.meta}</span>
            <span className="flex items-center justify-end gap-3 self-center font-mono text-xs">
              {it.year}
              {expandable ? (
                <Plus open={isOpen} />
              ) : (
                (it.to || it.href) && (
                  <Arrow className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                )
              )}
            </span>
          </div>
        )

        let head
        if (expandable) {
          head = (
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`row-panel-${i}`}
              data-cursor={cursor}
              className="fill group block w-full text-left"
            >
              {inner}
            </button>
          )
        } else if (it.to) {
          head = (
            <TLink to={it.to} label={it.label || it.title} className="fill group block" data-cursor={cursor}>
              {inner}
            </TLink>
          )
        } else if (it.href) {
          head = (
            <a href={it.href} className="fill group block" data-cursor={cursor}>
              {inner}
            </a>
          )
        } else {
          head = <div className="fill group block">{inner}</div>
        }

        let action = (
          <span className="btn border-black/25 opacity-60">{L.inProgress}</span>
        )
        if (it.href)
          action = (
            <a href={it.href} target="_blank" rel="noreferrer" className="btn fill group w-full justify-between md:w-auto md:justify-center">
              <Roll>{L.visit}</Roll>
              <Arrow />
            </a>
          )
        else if (it.to)
          action = (
            <TLink to={it.to} label={it.label || it.title} className="btn fill group w-full justify-between md:w-auto md:justify-center">
              <Roll>{L.open}</Roll>
              <Arrow dir="e" />
            </TLink>
          )

        return (
          <li key={it.title} data-open={isOpen} className="border-b-2 border-black">
            {head}
            {expandable && (
              <div
                id={`row-panel-${i}`}
                role="region"
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div data-inner className="min-h-0 overflow-hidden">
                  <div className="container grid gap-8 pb-10 pt-6 md:grid-cols-[4rem_1fr_16rem_6rem] md:gap-4 md:pb-14 md:pt-8">
                    <div className="hidden md:block" />
                    <div>
                      <p
                        className="rv max-w-[34rem] text-[clamp(1.15rem,1.8vw,1.7rem)] font-medium leading-[1.14] tracking-[-0.035em]"
                        style={{ '--i': 0 }}
                      >
                        {it.desc}
                      </p>
                      <div className="rv mt-8" style={{ '--i': 2 }}>
                        {action}
                      </div>
                    </div>
                    <ul className="rv grid grid-cols-2 gap-x-4 font-mono text-xs uppercase md:mt-1 md:block" style={{ '--i': 1 }}>
                      {(it.skills || []).map((s) => (
                        <li key={s} className="border-t border-black py-2 md:last:border-b">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Rows
