import { site } from '../lib/site'
import Warp from '../components/Warp'
import Rows from '../components/Rows'
import Parallax from '../components/Parallax'

// all content comes from src/lib/site.js
const { title, intro, items, back } = site.features

const Features = () => (
  <main className="overflow-x-clip pt-14">
    <Warp>
      <div className="container pb-10 pt-32 md:pt-56">
        <Parallax speed={0.08}>
          <h1 className="text-[clamp(3rem,17vw,18rem)] font-medium leading-[0.8] tracking-[-0.08em]">{title}</h1>
        </Parallax>
        <p className="mt-10 max-w-[22rem] border-t-2 border-black pt-3 text-[clamp(0.95rem,1.3vw,1.25rem)] font-medium leading-[1.12] tracking-[-0.03em] md:ml-auto">
          {intro}
        </p>
      </div>
    </Warp>
    <div className="border-t-2 border-black">
      <Rows items={[...items, { ...back, year: '', to: '/' }]} />
    </div>
  </main>
)

export default Features
