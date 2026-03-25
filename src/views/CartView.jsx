import { Link } from 'react-router-dom'

function CartView() {
  return (
    <section className="view view--compact">
      <span className="eyebrow">Carrito</span>
      <h1>Tu carrito todavia esta vacio</h1>
      <Link className="button" to="/">
        Volver al catalogo
      </Link>
    </section>
  )
}

export default CartView
