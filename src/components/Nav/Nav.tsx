import { Link } from "react-router-dom"
import { useState } from "react"


export default function Nav(): JSX.Element {
  const [styles, setStyles] = useState({display: 'none'});

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setStyles({display: styles.display === 'none' ? 'block' : 'none'})
  }
  return (
    <div>
      <button onClick={handleClick} aria-haspopup={'menu'} aria-expanded={false}>
        <label htmlFor="menu-button">Menu</label>
      </button>
      <input type="checkbox" id="menu-button" />
      <nav style={styles}>
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
    </div>
  )
}