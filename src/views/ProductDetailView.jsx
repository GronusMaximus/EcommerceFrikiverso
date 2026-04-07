import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getItemById } from '../services/items'

function ProductDetailView() {
  const { itemId } = useParams()
  const location = useLocation()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState({
    loading: true,
    error: '',
  })

  useEffect(() => {
    let isMounted = true

    const loadItem = async () => {
      setStatus({
        loading: true,
        error: '',
      })

      try {
        const item = await getItemById(itemId)

        if (!isMounted) {
          return
        }

        setProduct(item)
        setStatus({
          loading: false,
          error: '',
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setProduct(null)
        setStatus({
          loading: false,
          error:
            error.message ??
            'No se pudo cargar el detalle del producto desde la base de datos.',
        })
      }
    }

    loadItem()

    return () => {
      isMounted = false
    }
  }, [itemId])

  if (status.loading) {
    return (
      <section className="view view--compact">
        <span className="eyebrow">Detalle</span>
        <h1>Cargando producto</h1>
        <p className="lead">Estamos consultando Firestore para traer este item.</p>
      </section>
    )
  }

  if (status.error) {
    return (
      <section className="view view--compact">
        <span className="eyebrow">Detalle</span>
        <h1>No pudimos cargar el producto</h1>
        <p className="lead">{status.error}</p>
        <Link className="button" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="view view--compact">
        <span className="eyebrow">Detalle</span>
        <h1>Producto no encontrado</h1>
        <p className="lead">
          El identificador `{itemId}` no coincide con ningun producto de la coleccion `items`.
        </p>
        <Link className="button" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  const backLink = location.state?.returnTo ?? '/'
  const backLabel = location.state?.returnLabel ?? 'Volver al catalogo'

  return (
    <section className="view">
      <Link className="back-link" to={backLink}>
        {backLabel}
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
            <button className="button" type="button" onClick={() => addItem(product)}>
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
