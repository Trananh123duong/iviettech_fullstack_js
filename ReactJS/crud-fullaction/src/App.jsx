import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import Dashboard from './pages/admin/Dashboard'
import Create from './pages/admin/product/Create'
import Manager from './pages/admin/product/Manager'
import Update from './pages/admin/product/Update'
import Home from './pages/user/Home'
import List from './pages/user/product/List'

function App() {

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<Home />} />
        <Route path={ROUTES.USER.PRODUCT.LIST} element={<List />} />
      </Route>

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
