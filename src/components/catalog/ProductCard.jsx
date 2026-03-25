import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <span className="product-card__category">{product.categoryLabel}</span>
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-card__content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card__footer">
          <strong>${product.price.toLocaleString('es-UY')}</strong>
          <Link className="button button--ghost" to={`/item/${product.id}`}>
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
