// just a hard rule with a name
const SectionHead = ({ title, dark }) => (
  <div className={`border-b-2 ${dark ? 'border-white' : 'border-black'}`}>
    <div className="container py-3 font-mono text-xs uppercase">{title}</div>
  </div>
)

export default SectionHead
