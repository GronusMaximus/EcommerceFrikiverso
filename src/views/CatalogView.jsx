import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/catalog/ProductCard'
import { getProducts } from '../data/products'

const categoryTitles = {
  tecnologia: 'Tecnologia para tu setup',
  accesorios: 'Accesorios para salir liviano',
  hogar: 'Objetos para tu espacio',
}

function CatalogView() {
  const { categoryId } = useParams()
  const products = getProducts(categoryId)

  return (
    <section className="view">
      <div className="hero-panel">
        <div>
          <span className="eyebrow">El Frikiverso</span>
          <h1>{categoryTitles[categoryId] ?? 'Catalogo principal'}</h1>
        </div>

        <div className="hero-panel__actions">
          <Link className="button" to="/cart">
            Ir al carrito
          </Link>
          <Link className="button button--ghost" to="/category/hogar">
            Explorar hogar
          </Link>
        </div>
      </div>

      <div className="catalog-toolbar">
        <p>{products.length} productos disponibles</p>
        <div className="catalog-toolbar__filters">
          <Link to="/">Todos</Link>
          <Link to="/category/tecnologia">Tecnologia</Link>
          <Link to="/category/accesorios">Accesorios</Link>
          <Link to="/category/hogar">Hogar</Link>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default CatalogView
