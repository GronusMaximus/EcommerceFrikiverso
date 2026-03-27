import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/catalog/ProductCard'
import { formatCategoryLabel, getCategories, getItems } from '../services/items'

function CatalogView() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search')?.trim().toLowerCase() ?? ''
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState({
    loading: true,
    error: '',
  })

  useEffect(() => {
    let isMounted = true

    const loadCatalog = async () => {
      setStatus({
        loading: true,
        error: '',
      })

      try {
        const [items, availableCategories] = await Promise.all([
          getItems(),
          getCategories(),
        ])

        if (!isMounted) {
          return
        }

        setProducts(items)
        setCategories(availableCategories)
        setStatus({
          loading: false,
          error: '',
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setProducts([])
        setCategories([])
        setStatus({
          loading: false,
          error:
            error.message ??
            'No se pudieron cargar los productos desde Firestore.',
        })
      }
    }

    loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = categoryId
          ? product.category === categoryId
          : true
        const matchesSearch = searchTerm
          ? `${product.name} ${product.description} ${product.categoryLabel}`
              .toLowerCase()
              .includes(searchTerm)
          : true

        return matchesCategory && matchesSearch
      }),
    [categoryId, products, searchTerm],
  )

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value
    const queryString = searchTerm
      ? `?search=${encodeURIComponent(searchTerm)}`
      : ''

    if (!selectedCategory) {
      navigate(`/${queryString}`)
      return
    }

    navigate(`/category/${selectedCategory}${queryString}`)
  }

  return (
    <section className="view">
      <div className="hero-panel">
        <div>
          <span className="eyebrow">El Frikiverso</span>
          <h1>
            {categoryId
              ? `Categoria: ${formatCategoryLabel(categoryId)}`
              : 'Catalogo principal'}
          </h1>
          <p className="lead">
            Explora el catalogo completo, busca cualquier producto desde la barra superior y filtra por categoria desde este panel.
          </p>
        </div>

        <div className="hero-panel__actions">
          <Link className="button" to="/cart">
            Ir al carrito
          </Link>
          <label className="category-dropdown">
            <span>Filtrar por categoria</span>
            <select value={categoryId ?? ''} onChange={handleCategoryChange}>
              <option value="">Todas las categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="catalog-toolbar">
        <p>
          {status.loading
            ? 'Cargando productos...'
            : `${visibleProducts.length} productos disponibles`}
        </p>
        {searchTerm ? (
          <p className="catalog-toolbar__search">
            Busqueda activa: <strong>{searchParams.get('search')}</strong>
          </p>
        ) : (
          <p className="catalog-toolbar__search">Sin busqueda activa</p>
        )}
      </div>

      {status.loading ? (
        <div className="panel-message">
          <p className="lead">Estamos trayendo el catalogo desde Firestore.</p>
        </div>
      ) : null}

      {status.error ? (
        <div className="panel-message panel-message--error">
          <p className="lead">{status.error}</p>
        </div>
      ) : null}

      {!status.loading && !status.error && visibleProducts.length === 0 ? (
        <div className="panel-message">
          <p className="lead">
            No encontramos productos que coincidan con los filtros actuales.
          </p>
        </div>
      ) : null}

      {!status.loading && !status.error && visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default CatalogView
