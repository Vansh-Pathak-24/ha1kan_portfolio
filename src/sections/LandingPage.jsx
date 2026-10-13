import { site } from '../lib/site'
import Hero from '../components/Hero'
import Rows from '../components/Rows'
import SectionHead from '../components/SectionHead'
import About from './About'
import BigType from './BigType'
import Contact from './Contact'

const LandingPage = () => (
  <main>
    <Hero />
    <About />
    <BigType />
    <section id="work">
      <SectionHead title={site.work.label} meta={`(${String(site.work.items.length).padStart(2, '0')})`} />
      <Rows items={site.work.items} />
    </section>
    <Contact />
  </main>
)

export default LandingPage
