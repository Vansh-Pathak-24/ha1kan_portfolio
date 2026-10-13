const SectionHead = ({ title, meta, ch, dark }) => (
  <div className={`border-b-[3px] ${dark ? 'border-white' : 'border-black'}`}>
    <div className="container flex items-stretch justify-between font-mono text-xs uppercase">
      <span className="flex items-center gap-3">
        {ch && (
          <span className={`flex items-center self-stretch px-3 font-bold italic ${dark ? 'bg-white text-black' : 'bg-black text-white'}`}>
            CH.{ch}
          </span>
        )}
        <span className="py-3">{title}</span>
      </span>
      {meta && <span className="tnum self-center py-3">{meta}</span>}
    </div>
  </div>
)

export default SectionHead
