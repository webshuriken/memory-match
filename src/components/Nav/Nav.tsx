import { NavLink } from "react-router-dom"
import { useState } from "react"
import './Nav.css';

type MenuStateType = {
  open: boolean;
  class: string;
}

export default function Nav(): JSX.Element {
  const [menu, setMenu] = useState<MenuStateType>({ open: false, class: 'menu' });

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // update state
    setMenu(state => {
      return {
        open: !state.open,
        class: state.open ? 'menu open' : 'menu',
      }
    });
  }

  return (
    <>
      <button className="menu-button button-chip button-chip__yellow button__shine-effect" onClick={handleClick} aria-haspopup={'menu'} aria-expanded={false}>
        <label htmlFor="menuButtonCheckbox">Menu</label>
      </button>
      <input type="checkbox" id="menuButtonCheckbox" />
      <nav className={menu.class}>
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