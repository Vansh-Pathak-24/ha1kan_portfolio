import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SCALE = 4 // canvas is 1/4 size and stretched up: cheap, and the goo filter hides it
const rnd = (a, b) => a + Math.random() * (b - a)

// Liquid ink, restrained.
//  - white ink on a transparent canvas, sitting ABOVE the hero with mix-blend-difference:
//    it inverts whatever is under it (black text -> white, white page -> black).
//    The text itself is plain black, so it stays readable even if blending ever fails.
//  - blur + alpha threshold (SVG goo filter) merges the dots into hard-edged liquid.
//  - splatter is deliberately small: a few satellite droplets on fast moves / clicks.
const Liquid = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const p = cv.parentElement
    const coarse = matchMedia('(pointer: coarse)').matches
    const ptr = { x: 0, y: 0, in: false }
    const cur = { x: 0, y: 0 }
    const drops = []
    let w = 0
    let h = 0
    let idle = 0
    let primed = false
    let visible = true
    let amb = 0
    let nextSplat = 1500
    let cooldown = 0

    const size = () => {
      const r = p.getBoundingClientRect()
      w = cv.width = Math.ceil(r.width / SCALE)
      h = cv.height = Math.ceil(r.height / SCALE)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(p)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(p)

    const line = (x0, y0, x1, y1, r) => {
      const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / (r * 0.4)))
      for (let i = 1; i <= steps; i++) {
        ctx.beginPath()
        ctx.arc(x0 + ((x1 - x0) * i) / steps, y0 + ((y1 - y0) * i) / steps, r, 0, 6.2832)
        ctx.fill()
      }
    }
    const drop = (x, y, vx, vy, r, shr = 0.4, drag = 0.02) => drops.push({ x, y, vx, vy, r, shr, drag })
    // small, controlled splat: one core that settles + a few satellites
    const splat = (x, y, n = 6, power = 1) => {
      drop(x, y, 0, 0, 11 * power, 0.14)
      for (let i = 0; i < n; i++) {
        const a = rnd(0, 6.2832)
        const s = rnd(0.05, 0.26) * power
        drop(x, y, Math.cos(a) * s, Math.sin(a) * s, rnd(3.4, 5.6), rnd(0.3, 0.5))
      }
      idle = 0
    }

    const move = (e) => {
      if (coarse) return
      ptr.x = e.clientX
      ptr.y = e.clientY
      ptr.in = true
      idle = 0
    }
    const down = (e) => {
      if (!visible) return
      const r = cv.getBoundingClientRect()
      if (e.clientY < r.top || e.clientY > r.bottom) return
      splat((e.clientX - r.left) / SCALE, (e.clientY - r.top) / SCALE, 10, 1)
    }
    const leave = () => (ptr.in = false)
    const intro = () => splat(w * 0.72, h * 0.42, 10, 1)
    let t1
    if (window.__loaded) t1 = setTimeout(intro, 300)
    else window.addEventListener('loaded', () => (t1 = setTimeout(intro, 500)), { once: true })

    const tick = (_t, raw) => {
      if (!visible) return
      const dt = Math.min(raw, 50)
      if (drops.length) idle = 0
      idle += dt
      if (idle > 2600) return // everything faded: stop drawing entirely
      cooldown -= dt

      // fade the ink away (time-based, identical at 60/144Hz)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0,0,0,${1 - Math.pow(0.93, dt / 16.7)})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#fff'

      let tx = 0
      let ty = 0
      let active = false
      if (coarse) {
        amb += dt / 1000
        tx = w * (0.5 + 0.4 * Math.sin(amb * 0.8))
        ty = h * (0.55 + 0.3 * Math.sin(amb * 1.3 + 1))
        active = true
        idle = 0
        nextSplat -= dt
        if (nextSplat <= 0) {
          nextSplat = rnd(3500, 6000)
          splat(tx, ty, 4, 0.6)
        }
      } else if (ptr.in) {
        const r = cv.getBoundingClientRect()
        tx = (ptr.x - r.left) / SCALE
        ty = (ptr.y - r.top) / SCALE
        active = tx > -20 && ty > -20 && tx < w + 20 && ty < h + 20
      }

      if (active) {
        if (!primed) {
          cur.x = tx
          cur.y = ty
          primed = true
        }
        const px = cur.x
        const py = cur.y
        const k = 1 - Math.pow(1e-8, dt / 1000) // ~55ms lag: the blob stays right under the cursor
        cur.x += (tx - px) * k
        cur.y += (ty - py) * k
        const dx = cur.x - px
        const dy = cur.y - py
        const dist = Math.hypot(dx, dy)
        line(px, py, cur.x, cur.y, (coarse ? 8 : 9) + Math.min(dist * 0.8, 13))
        // only fast flicks shed a droplet, at most one every ~110ms
        if (dist > 4 && cooldown <= 0) {
          cooldown = 70
          const vx = dx / dt
          const vy = dy / dt
          for (let i = 0; i < 2; i++) {
            drop(cur.x + rnd(-3, 3), cur.y + rnd(-3, 3), vx * rnd(0.2, 0.5) - vy * rnd(-0.25, 0.25), vy * rnd(0.2, 0.5) + vx * rnd(-0.25, 0.25), rnd(3.6, 5.4))
          }
        }
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i]
        const ox = d.x
        const oy = d.y
        d.x += d.vx * dt
        d.y += d.vy * dt
        const f = Math.pow(d.drag, dt / 1000)
        d.vx *= f
        d.vy *= f
        d.r *= Math.pow(d.shr, dt / 1000)
        if (d.r < 2.6) {
          drops.splice(i, 1)
          continue
        }
        line(ox, oy, d.x, d.y, d.r)
      }
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    document.addEventListener('pointerleave', leave)
    gsap.ticker.add(tick)
    return () => {
      clearTimeout(t1)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerleave', leave)
      gsap.ticker.remove(tick)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="ink-goo" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="9" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -16" />
        </filter>
      </svg>
      <canvas
        ref={ref}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full mix-blend-difference"
        style={{ filter: 'url(#ink-goo)' }}
      />
    </>
  )
}

export default Liquid
