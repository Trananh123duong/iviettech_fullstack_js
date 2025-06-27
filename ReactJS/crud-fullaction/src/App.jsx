import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Create from './pages/admin/product/Create'
import Manager from './pages/admin/product/Manager'
import Update from './pages/admin/product/Update'

function App() {

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ADMIN.PRODUCT.MANAGER} element={<Manager />} />
        <Route path={ROUTES.ADMIN.PRODUCT.CREATE} element={<Create />} />
        <Route path={ROUTES.ADMIN.PRODUCT.UPDATE} element={<Update />} />
      </Route>
    </Routes>
  )
}

export default App
