import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layout/MainLayout'
import CartView from './views/CartView'
import CatalogView from './views/CatalogView'
import NotFoundView from './views/NotFoundView'
import ProductDetailView from './views/ProductDetailView'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<CatalogView />} />
        <Route path="category/:categoryId" element={<CatalogView />} />
        <Route path="item/:itemId" element={<ProductDetailView />} />
        <Route path="cart" element={<CartView />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  )
}

export default App
