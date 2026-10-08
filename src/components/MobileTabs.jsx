import { useLocation } from 'react-router-dom'
import { site } from '../lib/site'
import { useSection } from '../lib/useSection'
import TLink from './TLink'

const ids = site.sections.map((s) => s.id)
const sectionOf = (to) => (to === '/' ? 'top' : to.startsWith('/#') ? to.slice(2) : null)

// Phones: a fixed bottom tab bar (thumb reach) built from site.nav. A black block slides
// to the tab for the section you are reading, so it doubles as scroll navigation.
const MobileTabs = () => {
  const { pathname } = useLocation()
  const home = pathname === '/'
  const active = useSection(ids, home)
  const section = active === 'about' ? 'top' : active
  const n = site.nav.length
  const index = site.nav.findIndex((l) => (home ? sectionOf(l.to) === section : l.to === pathname))

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[80] border-t-2 border-black bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Primary"
    >
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 bg-black transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]"
          style={{ width: `${100 / n}%`, transform: `translateX(${Math.max(index, 0) * 100}%)`, opacity: index < 0 ? 0 : 1 }}
        />
        {site.nav.map((l, i) => (
          <TLink
            key={l.to}
            to={l.to}
            label={l.label}
            className={`relative flex h-14 items-center justify-center font-mono text-[11px] uppercase leading-none transition-colors duration-300 ${
              i === index ? 'text-white' : 'text-black'
            } ${i < n - 1 ? 'border-r-2 border-black' : ''}`}
          >
            {l.label}
          </TLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileTabs
