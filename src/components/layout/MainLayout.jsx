import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

function MainLayout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
