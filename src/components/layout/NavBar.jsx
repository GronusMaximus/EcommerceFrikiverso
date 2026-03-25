import { NavLink } from 'react-router-dom'

const navLinkClassName = ({ isActive }) =>
  isActive ? 'nav__link nav__link--active' : 'nav__link'

function NavBar() {
  return (
    <header className="navbar">
      <NavLink className="navbar__brand" to="/">
        <span className="navbar__badge">EF</span>
        <div>
          <strong>El Frikiverso</strong>
          <p>Tu tienda friki online</p>
        </div>
      </NavLink>

      <nav className="nav">
        <NavLink className={navLinkClassName} to="/">
          Catalogo
        </NavLink>
        <NavLink className={navLinkClassName} to="/cart">
          Carrito
        </NavLink>
      </nav>
    </header>
  )
}

export default NavBar
