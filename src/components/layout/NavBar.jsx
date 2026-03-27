import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const navLinkClassName = ({ isActive }) =>
  isActive ? 'nav__link nav__link--active' : 'nav__link'

function NavBar() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const normalizedSearch = searchTerm.trim()

    if (!normalizedSearch) {
      navigate('/')
      return
    }

    navigate(`/?search=${encodeURIComponent(normalizedSearch)}`)
  }

  return (
    <header className="navbar">
      <div className="navbar__top">
        <NavLink className="navbar__brand" to="/">
          <span className="navbar__badge">EF</span>
          <div>
            <strong>El Frikiverso</strong>
            <p>Tu tienda friki online</p>
          </div>
        </NavLink>

        <form className="product-search" onSubmit={handleSubmit}>
          <label className="product-search__field">
            <input
              type="search"
              placeholder="Buscar productos frikis"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          <button className="button" type="submit">
            Buscar
          </button>
        </form>

        <nav className="nav">
          <NavLink className={navLinkClassName} to="/">
            Catalogo
          </NavLink>
          <NavLink className={navLinkClassName} to="/cart">
            Carrito
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
