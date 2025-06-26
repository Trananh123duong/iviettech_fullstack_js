import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import AdminLayout from './layouts/AdminLayout'
import Create from './pages/admin/product/Create'
import Manager from './pages/admin/product/Manager'

function App() {

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.PRODUCT.MANAGER} element={<Manager />} />
        <Route path={ROUTES.ADMIN.PRODUCT.CREATE} element={<Create />} />
      </Route>
    </Routes>
  )
}

export default App
