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
          <NavLink className="cart-link" to="/cart" aria-label="Ir al carrito">
            <svg
              className="cart-link__icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 4H5L7.2 14.4C7.29 14.81 7.52 15.18 7.85 15.45C8.17 15.72 8.58 15.86 9 15.85H17.8C18.22 15.86 18.63 15.72 18.95 15.45C19.28 15.18 19.51 14.81 19.6 14.4L21 7H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 20C10.3284 20 11 19.3284 11 18.5C11 17.6716 10.3284 17 9.5 17C8.67157 17 8 17.6716 8 18.5C8 19.3284 8.67157 20 9.5 20Z"
                fill="currentColor"
              />
              <path
                d="M17.5 20C18.3284 20 19 19.3284 19 18.5C19 17.6716 18.3284 17 17.5 17C16.6716 17 16 17.6716 16 18.5C16 19.3284 16.6716 20 17.5 20Z"
                fill="currentColor"
              />
            </svg>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
