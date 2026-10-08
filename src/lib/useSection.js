import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// which landing-page section is currently in the middle of the screen
export const useSection = (ids, enabled = true) => {
  const [active, setActive] = useState(ids[0])
  const key = ids.join()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key])
  return active
}
