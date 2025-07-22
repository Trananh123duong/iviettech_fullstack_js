import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import BrandCreate from './pages/admin/brand/Create'
import BrandManager from './pages/admin/brand/Manager'
import BrandUpdate from './pages/admin/brand/Update'
import CategoryCreate from './pages/admin/category/Create'
import CategoryManager from './pages/admin/category/Manager'
import CategoryUpdate from './pages/admin/category/Update'
import Dashboard from './pages/admin/Dashboard'
import ProductCreate from './pages/admin/product/Create'
import ProductManager from './pages/admin/product/Manager'
import ProductUpdate from './pages/admin/product/Update'
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

        <Route path={ROUTES.ADMIN.PRODUCT.MANAGER} element={<ProductManager />} />
        <Route path={ROUTES.ADMIN.PRODUCT.CREATE} element={<ProductCreate />} />
        <Route path={ROUTES.ADMIN.PRODUCT.UPDATE} element={<ProductUpdate />} />

        <Route path={ROUTES.ADMIN.BRAND.MANAGER} element={<BrandManager />} />
        <Route path={ROUTES.ADMIN.BRAND.CREATE} element={<BrandCreate />} />
        <Route path={ROUTES.ADMIN.BRAND.UPDATE} element={<BrandUpdate />} />

        <Route path={ROUTES.ADMIN.CATEGORY.MANAGER} element={<CategoryManager />} />
        <Route path={ROUTES.ADMIN.CATEGORY.CREATE} element={<CategoryCreate />} />
        <Route path={ROUTES.ADMIN.CATEGORY.UPDATE} element={<CategoryUpdate />} />
      </Route>
    </Routes>
  )
}

export default App
