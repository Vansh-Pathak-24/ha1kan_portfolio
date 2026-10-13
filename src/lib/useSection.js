import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useSection = (ids, enabled = true) => {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    if (!enabled) return
    const triggers = ids
      .filter((id) => document.getElementById(id))
      .map((id) =>
        ScrollTrigger.create({
          trigger: '#' + id,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (s) => s.isActive && setActive(id),
        })
      )
    return () => triggers.forEach((t) => t.kill())
  }, [enabled, ids])
  return active
}
