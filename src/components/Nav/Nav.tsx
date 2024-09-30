import { NavLink } from "react-router-dom"
import { useState } from "react"
import './Nav.css';

type MenuStateType = {
  open: boolean;
  class: string;
}

// function is used by anchor and button elements to open menu
type HandleClickType = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>;


export default function Nav(): JSX.Element {
  const [menu, setMenu] = useState<MenuStateType>({ open: false, class: 'menu' });

  function handleClick(event: HandleClickType) {
    // update state
    setMenu(state => {
      return {
        open: !state.open,
        class: !state.open ? 'menu open' : 'menu',
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
            <NavLink className="menu-list__link button__shine-effect" to={'/'} onClick={handleClick}>Play</NavLink>
          </li>
          <li>
            <NavLink className="menu-list__link button__shine-effect" to={'leaderboard'} onClick={handleClick}>Leaderboard</NavLink>
          </li>
          <li>
            <NavLink className="menu-list__link button__shine-effect" to={'settings'} onClick={handleClick}>Settings</NavLink>
          </li>
          <li>
            <NavLink className="menu-list__link button__shine-effect" to={'about'} onClick={handleClick}>About</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}