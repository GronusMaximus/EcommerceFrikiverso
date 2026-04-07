import { Link, useLocation } from 'react-router-dom'
import { formatCategoryLabel } from '../../services/items'

function ProductCard({ product }) {
  const location = useLocation()
  const activeCategoryPath = location.pathname.startsWith('/category/')
    ? location.pathname
    : '/'
  const returnLabel = activeCategoryPath === '/'
    ? 'Volver al catalogo'
    : `Volver a ${formatCategoryLabel(activeCategoryPath.split('/').at(-1) ?? '')}`

  return (
    <Link
      className="product-card"
      to={`/item/${product.id}`}
      state={{
        returnTo: activeCategoryPath,
        returnLabel,
      }}
    >
      <div className="product-card__media">
        <span className="product-card__category">{product.categoryLabel}</span>
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-card__content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card__footer">
          <strong>${product.price.toLocaleString('es-UY')}</strong>
          <span className="button button--ghost product-card__cta">
            Ver detalle
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
