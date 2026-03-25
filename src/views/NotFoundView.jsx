import { Link } from 'react-router-dom'

function NotFoundView() {
  return (
    <section className="view view--compact">
      <span className="eyebrow">404</span>
      <h1>No encontramos esa vista</h1>
      <p className="lead">
        La ruta a la que intentas acceder no existe.
      </p>
      <Link className="button" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundView
