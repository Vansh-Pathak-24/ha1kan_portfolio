import { site } from '../lib/site'
import { scrollToTarget } from '../lib/lenis'
import { useSection } from '../lib/useSection'
import Roll from './Roll'
import { Arrow } from './Icons'

const ids = site.sections.map((s) => s.id)
const L = site.labels

// Desktop scroll navigation: a small boxed readout (01/04 + section name that swaps as
// you scroll) with a button that glides to the next section, and to the top at the end.
// On phones the bottom tab bar does this job instead.
const ScrollNav = () => {
  const active = useSection(ids)
  const i = Math.max(0, ids.indexOf(active))
  const last = i === ids.length - 1
  const next = () => scrollToTarget(last ? 0 : document.getElementById(ids[i + 1]), { duration: 1.6 })
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="fixed bottom-6 right-[var(--page-padding)] z-[60] hidden items-stretch border-2 border-black bg-white font-mono text-xs uppercase leading-none md:flex">
      <div className="flex items-center gap-3 px-4">
        <span className="tnum">
          {pad(i + 1)}/{pad(ids.length)}
        </span>
        <span className="block min-w-[4.5rem] overflow-hidden">
          <span key={active} className="rise-fast block">
            {site.sections[i].label}
          </span>
        </span>
      </div>
      <button onClick={next} className="fill group flex h-11 items-center gap-2 border-l-2 border-black px-4">
        <Roll>{last ? L.top : L.next}</Roll>
        <Arrow dir={last ? 'n' : 's'} />
      </button>
    </div>
  )
}

export default ScrollNav
