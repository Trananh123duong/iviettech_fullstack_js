import { Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import { ROUTES } from './constants/routes'
import Manager from './pages/admin/product/Manager'

function App() {

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.PRODUCT.MANAGER} element={<Manager />} />
        <Route path={ROUTES.ADMIN.PRODUCT.CREATE} element />
      </Route>
    </Routes>
  )
}

export default App
