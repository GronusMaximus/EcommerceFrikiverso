import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'

function ProductDetailView() {
  const { itemId } = useParams()
  const product = getProductById(itemId)

  if (!product) {
    return (
      <section className="view view--compact">
        <span className="eyebrow">Detalle</span>
        <h1>Producto no encontrado</h1>
        <p className="lead">
          El identificador `{itemId}` no coincide con ningun producto del catalogo base.
        </p>
        <Link className="button" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="view">
      <Link className="back-link" to={`/category/${product.category}`}>
        Volver a {product.categoryLabel}
      </Link>

      <article className="detail-card">
        <div className="detail-card__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-card__content">
          <span className="eyebrow">{product.categoryLabel}</span>
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <p>{product.longDescription}</p>

          <div className="detail-card__meta">
            <div>
              <span>Precio</span>
              <strong>${product.price.toLocaleString('es-UY')}</strong>
            </div>
            <div>
              <span>Stock</span>
              <strong>{product.stock} unidades</strong>
            </div>
          </div>

          <div className="detail-card__actions">
            <button className="button" type="button">
              Agregar al carrito
            </button>
            <Link className="button button--ghost" to="/cart">
              Ver carrito
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}

export default ProductDetailView
