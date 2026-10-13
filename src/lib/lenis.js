import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
addEventListener('beforeunload', () => scrollTo(0, 0))

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

export const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: !reduce,
  wheelMultiplier: 1,
  autoRaf: false,
})

lenis.on('scroll', ScrollTrigger.update)
const raf = (t) => lenis.raf(t * 1000)
gsap.ticker.add(raf)
gsap.ticker.lagSmoothing(0)

document.fonts?.ready.then(() => ScrollTrigger.refresh())
addEventListener('load', () => ScrollTrigger.refresh())

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    gsap.ticker.remove(raf)
    lenis.destroy()
  })
}

export const markLoaded = () => {
  if (window.__loaded) return
  window.__loaded = true
  window.dispatchEvent(new Event('loaded'))
}
setTimeout(markLoaded, 7000)

export const SCRUB = matchMedia('(pointer: coarse)').matches ? 0.4 : true

export const NAV_H = 56

export const scrollToTarget = (target, opts = {}) =>
  lenis.scrollTo(target, {
    offset: -NAV_H,
    duration: 1.6,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    force: true,
    ...opts,
  })
