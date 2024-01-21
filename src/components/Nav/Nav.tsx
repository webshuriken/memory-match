import { Link } from "react-router-dom"


export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Play</Link>
        </li>
      </ul>
    </nav>
  )
}