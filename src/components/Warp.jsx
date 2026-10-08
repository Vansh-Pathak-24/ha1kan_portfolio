import { useEffect, useRef, useId } from 'react'
import gsap from 'gsap'

const R = 170 // lens radius (px)
const STRENGTH = -80 // negative = bulge, positive = pinch

// radial displacement map: R/G channels = push direction, fades to neutral grey at the edge
const makeMap = () => {
  const s = R * 2
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(s, s)
  for (let py = 0; py < s; py++) {
    for (let px = 0; px < s; px++) {
      const dx = (px - R) / R
      const dy = (py - R) / R
      const d = Math.hypot(dx, dy)
      const f = d < 1 ? (1 - d) ** 2 : 0
      const i = (py * s + px) * 4
      img.data[i] = 128 + 127 * dx * f
      img.data[i + 1] = 128 + 127 * dy * f
      img.data[i + 2] = 128
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return c.toDataURL()
}

// Wrap anything in <Warp> and the cursor bends it while hovering.
const Warp = ({ children, className = '', style }) => {
  const id = 'warp' + useId().replace(/:/g, '')
  const wrap = useRef(null)
  const lens = useRef(null)
  const disp = useRef(null)

  useEffect(() => {
    if (
      matchMedia('(pointer: coarse)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return

    const el = wrap.current
    lens.current.setAttribute('href', makeMap())
    const m = { x: 0, y: 0, tx: 0, ty: 0 }

    let lx = NaN
    let ly = NaN
    const tick = () => {
      m.x += (m.tx - m.x) * 0.12
      m.y += (m.ty - m.y) * 0.12
      const r = el.getBoundingClientRect()
      const x = Math.round(m.x - r.left - R)
      const y = Math.round(m.y - r.top - R)
      // re-running the SVG filter is the expensive part: only do it when the lens moved
      if (x === lx && y === ly) return
      lx = x
      ly = y
      lens.current.setAttribute('x', x)
      lens.current.setAttribute('y', y)
    }
    const move = (e) => {
      m.tx = e.clientX
      m.ty = e.clientY
    }
    const enter = (e) => {
      m.x = m.tx = e.clientX
      m.y = m.ty = e.clientY
      el.style.filter = `url(#${id})`
      gsap.killTweensOf(disp.current) // cancel a leave animation still running
      gsap.ticker.remove(tick)
      gsap.ticker.add(tick)
      gsap.to(disp.current, { attr: { scale: STRENGTH }, duration: 0.7, ease: 'power3.out' })
    }
    const leave = () => {
      gsap.killTweensOf(disp.current)
      gsap.to(disp.current, {
        attr: { scale: 0 },
        duration: 0.7,
        ease: 'power3.out',
        onComplete: () => {
          el.style.filter = ''
          gsap.ticker.remove(tick)
        },
      })
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mousemove', move, { passive: true })
    el.addEventListener('mouseleave', leave)
    return () => {
      gsap.ticker.remove(tick)
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [id])

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feFlood floodColor="rgb(128,128,128)" result="neutral" />
          <feImage ref={lens} width={R * 2} height={R * 2} x="-999" y="-999" result="lens" />
          <feMerge result="map">
            <feMergeNode in="neutral" />
            <feMergeNode in="lens" />
          </feMerge>
          <feDisplacementMap
            ref={disp}
            in="SourceGraphic"
            in2="map"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div ref={wrap} className={className} style={style}>
        {children}
      </div>
    </>
  )
}

export default Warp
