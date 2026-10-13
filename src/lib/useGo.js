import { useNavigate, useLocation } from 'react-router-dom'
import { scrollToTarget } from './lenis'

export const useGo = () => {
  const navigate = useNavigate()
  const loc = useLocation()
  return (to, label) => {
    const [path, hash = ''] = to.split('#')
    if ((path || '/') === loc.pathname) {
      scrollToTarget((hash && document.getElementById(hash)) || 0)
      return
    }
    const swap = () => navigate(to)
    if (window.__wipe) window.__wipe(label || to, swap)
    else swap()
  }
}
