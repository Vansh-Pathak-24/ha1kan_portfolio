import { site } from '../lib/site'
import Hero from '../components/Hero'
import Rows from '../components/Rows'
import SectionHead from '../components/SectionHead'
import Depth from '../components/Depth'
import ScrollNav from '../components/ScrollNav'
import About from './About'
import BigType from './BigType'
import Contact from './Contact'

// all content comes from src/lib/site.js
const LandingPage = () => (
  <main>
    <ScrollNav />
    <Hero />
    <Depth>
      <About />
    </Depth>
    <Depth>
      <BigType />
    </Depth>
    <Depth>
      <section id="work">
        <SectionHead title={site.work.label} />
        <Rows items={site.work.items} />
      </section>
    </Depth>
    <Depth dark>
      <Contact />
    </Depth>
  </main>
)

export default LandingPage
