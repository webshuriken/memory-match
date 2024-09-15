import { NavLink } from "react-router-dom"
import { useState } from "react"
import './Nav.css';


export default function Nav(): JSX.Element {
  const [styles, setStyles] = useState({display: 'none'});

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setStyles({display: styles.display === 'none' ? 'block' : 'none'})
  }
  return (
    <>
      <button className="menu-button button-chip button-chip__yellow button__shine-effect" onClick={handleClick} aria-haspopup={'menu'} aria-expanded={false}>
        <label htmlFor="menuButtonCheckbox">Menu</label>
      </button>
      <input type="checkbox" id="menuButtonCheckbox" />
      <nav style={styles} className="menu">
        <ul className="menu-list">
          <li>
            <NavLink className="menu-list__link button__shine-effect" to={'/'}>Play</NavLink>
          </li>
          <li>
            <NavLink className="menu-list__link button__shine-effect" to={'leaderboard'}>Leaderboard</NavLink>
          </li>
          <li>
            <NavLink className="menu-list__link button__shine-effect" to={'settings'}>Settings</NavLink>
          </li>
          <li>
            <NavLink className="menu-list__link button__shine-effect" to={'about'}>About</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}