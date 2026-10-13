import { Link } from 'react-router-dom'
import { useGo } from '../lib/useGo'

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
