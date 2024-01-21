import { Link } from "react-router-dom"


export default function Nav(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Play</Link>
        </li>
        <li>
          <Link to={'leaderboard'}>Leaderboard</Link>
        </li>
        <li>
          <Link to={'settings'}>Settings</Link>
        </li>
        <li>
          <Link to={'about'}>About</Link>
        </li>
      </ul>
    </nav>
  )
}