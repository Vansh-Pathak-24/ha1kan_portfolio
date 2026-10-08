import { Link, useNavigate, useLocation } from 'react-router-dom'
import { scrollToTarget } from '../lib/lenis'

// go(to, label): same-page targets just smooth-scroll (no #hash in the URL),
// other pages play the black wipe
export const useGo = () => {
  const navigate = useNavigate()
  const loc = useLocation()
  return (to, label) => {
    const [path, hash = ''] = to.split('#')
    if ((path || '/') === loc.pathname) {
      scrollToTarget((hash && document.getElementById(hash)) || 0)
      return
    }
    window.__wipe(label || to, () => navigate(to), path || '/')
  }
}

const TLink = ({ to, label, onClick, children, ...rest }) => {
  const go = useGo()
  const click = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    onClick?.()
    go(to, label)
  }
  return (
    <Link to={to} onClick={click} {...rest}>
      {children}
    </Link>
  )
}

export default TLink
