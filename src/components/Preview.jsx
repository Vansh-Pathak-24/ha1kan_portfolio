import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

const OFFSET = 56

const Preview = ({ item, index, on }) => {
  const box = useRef(null)

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const el = box.current
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    const move = (e) => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      x(e.clientX + OFFSET + w > innerWidth ? e.clientX - OFFSET - w : e.clientX + OFFSET)
      y(e.clientY + OFFSET + h > innerHeight ? e.clientY - OFFSET - h : e.clientY + OFFSET)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    gsap.to(box.current, {
      clipPath: on ? 'inset(-12px -12px -12px -12px)' : 'inset(0px 0px 100% 0px)',
      duration: on ? 0.45 : 0.3,
      ease: 'expo.out',
      overwrite: 'auto',
    })
  }, [on])

  return createPortal(
    <div
      ref={box}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden w-64 -rotate-2 border-[3px] border-black bg-white shadow-[6px_6px_0_#000] font-mono text-xs uppercase [@media(pointer:fine)]:block"
      style={{ clipPath: 'inset(0px 0px 100% 0px)' }}
    >
      {item && (
        <>
          <div className="flex justify-between border-b-[3px] border-black px-3 py-2">
            <span className="tnum">{String(index + 1).padStart(2, '0')}</span>
            <span>{item.year}</span>
          </div>
          <div className="border-b-[3px] border-black px-3 py-4 font-sans text-2xl font-medium normal-case leading-[0.95] tracking-[-0.05em]">
            {item.title}
          </div>
          <ul>
            {item.skills.map((s) => (
              <li key={s} className="border-t border-black px-3 py-2 first:border-t-0">
                {s}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>,
    document.body
  )
}

export default Preview
