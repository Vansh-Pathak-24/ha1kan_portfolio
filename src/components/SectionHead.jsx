const SectionHead = ({ title, meta, dark }) => (
  <div className={`border-b-2 ${dark ? 'border-white' : 'border-black'}`}>
    <div className="container flex items-center justify-between py-3 font-mono text-xs uppercase">
      <span>{title}</span>
      {meta && <span className="tnum">{meta}</span>}
    </div>
  </div>
)

export default SectionHead
