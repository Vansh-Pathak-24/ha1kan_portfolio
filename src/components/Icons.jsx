export const Arrow = ({ dir = 'ne', className = '' }) => (
  <svg
    viewBox="0 0 12 12"
    width="0.95em"
    height="0.95em"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="square"
    className={`block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {dir === 'ne' && <path d="M2.5 9.5 9.5 2.5M3.5 2.5h6v6" />}
    {dir === 'e' && <path d="M1.5 6h9M6.5 2l4 4-4 4" />}
    {dir === 'n' && <path d="M6 10.5v-9M2 5.5l4-4 4 4" />}
    {dir === 's' && <path d="M6 1.5v9M2 6.5l4 4 4-4" />}
  </svg>
)

export const Plus = ({ open = false }) => (
  <span
    aria-hidden="true"
    className="relative block h-2.5 w-2.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]"
    style={{ transform: open ? 'rotate(45deg)' : 'none' }}
  >
    <span className="absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 bg-current" />
    <span className="absolute left-1/2 top-0 block h-full w-[2px] -translate-x-1/2 bg-current" />
  </span>
)