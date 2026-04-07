import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartView() {
  const {
    cartItems,
    clearCart,
    decreaseItemQuantity,
    increaseItemQuantity,
    removeItem,
    subtotal,
    totalItemsCount,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <section className="view view--compact">
        <span className="eyebrow">Carrito</span>
        <h1>Tu carrito todavia esta vacio</h1>
        <p className="lead">
          Agrega productos desde el detalle para verlos aqui, ajustar cantidades y preparar tu compra.
        </p>
        <Link className="button" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="view">
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Carrito</span>
          <h1>Tu seleccion friki</h1>
          <p className="lead">
            Tienes {cartItems.length} productos distintos y {totalItemsCount} unidades en total.
          </p>
        </div>

        <div className="hero-panel__actions">
          <div className="cart-summary">
            <span>Subtotal</span>
            <strong>${subtotal.toLocaleString('es-UY')}</strong>
          </div>
          <button className="button button--ghost" type="button" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>
      </div>

      <div className="cart-list">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-item">
            <img className="cart-item__image" src={item.image} alt={item.name} />

            <div className="cart-item__content">
              <div>
                <span className="eyebrow">{item.categoryLabel}</span>
                <h2>{item.name}</h2>
                <p className="lead">{item.description}</p>
              </div>

              <div className="cart-item__meta">
                <div>
                  <span>Precio unitario</span>
                  <strong>${item.price.toLocaleString('es-UY')}</strong>
                </div>
                <div>
                  <span>Subtotal</span>
                  <strong>
                    ${(item.price * item.quantity).toLocaleString('es-UY')}
                  </strong>
                </div>
              </div>
            </div>

            <div className="cart-item__actions">
              <div className="quantity-control">
                <button
                  className="quantity-control__button"
                  type="button"
                  onClick={() => decreaseItemQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-control__button"
                  type="button"
                  onClick={() => increaseItemQuantity(item.id)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>

              <button
                className="button button--ghost"
                type="button"
                onClick={() => removeItem(item.id)}
              >
                Quitar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CartView
