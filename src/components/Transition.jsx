import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BARS = 6

// One signature page transition: six hard black bars sweep up and over, the old page
// tilts back under them, the route swaps, the bars continue off the top and the new
// page unfolds into place. Same motion every time = a consistent design language.
const Transition = () => {
  const root = useRef(null)
  const bars = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    gsap.set(root.current, { visibility: 'hidden' })
    let busy = false

    window.__wipe = (text, swap) => {
      if (busy) return
      busy = true
      const page = document.getElementById('page')
      const cols = bars.current.children
      label.current.textContent = text
      gsap.set(root.current, { visibility: 'visible', pointerEvents: 'auto' })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(root.current, { visibility: 'hidden', pointerEvents: 'none' })
          gsap.set(page, { clearProps: 'transform' })
          ScrollTrigger.refresh() // positions were measured while the page was offset
          busy = false
        },
      })

      tl.fromTo(cols, { yPercent: 101 }, { yPercent: 0, duration: 0.8, ease: 'expo.inOut', stagger: 0.07 }, 0)
      tl.to(
        page,
        { y: '-12vh', scale: 0.92, rotateX: 6, transformPerspective: 1400, transformOrigin: '50% 100%', duration: 0.9, ease: 'expo.in' },
        0
      )
      tl.fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' }, '>-0.3')

      tl.add(swap) // route changes while fully covered
      tl.set(page, { y: '12vh', scale: 0.92, rotateX: -6 })

      tl.to(label.current, { yPercent: -110, duration: 0.5, ease: 'expo.in' }, '+=0.3')
      tl.to(cols, { yPercent: -101, duration: 0.8, ease: 'expo.inOut', stagger: 0.07 }, '<')
      tl.to(page, { y: 0, scale: 1, rotateX: 0, duration: 1.1, ease: 'expo.out' }, '<0.1')
    }
  }, [])

  return (
    <div ref={root} className="pointer-events-none invisible fixed inset-0 z-[150] overflow-hidden">
      <div ref={bars} className="absolute inset-0 flex">
        {Array.from({ length: BARS }, (_, i) => (
          <div key={i} className="h-full flex-1 bg-black" />
        ))}
      </div>
      <div className="absolute inset-0 flex items-end p-[var(--page-padding)] text-white">
        <div className="overflow-hidden pb-[0.1em]">
          <div
            ref={label}
            className="text-[clamp(4rem,16vw,18rem)] font-medium leading-[0.85] tracking-[-0.07em]"
          />
        </div>
      </div>
    </div>
  )
}

export default Transition
