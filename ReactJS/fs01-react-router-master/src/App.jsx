import { Suspense, lazy } from 'react'
import { Routes, Route, ScrollRestoration } from 'react-router-dom'
import { ConfigProvider } from 'antd'
// Layout
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
// User pages
import Home from './pages/user/Home'
// import About from './pages/user/About'
import ProductDetail from './pages/user/ProductDetail'
// Admin pages
import Dashboard from './pages/admin/Dashboard'
import Chart from './pages/admin/Chart'

import { ROUTES } from './constants/routes'

const About = lazy(() => import('./pages/user/About'))

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#eb1ea3',
          borderRadius: 0,
        },
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path={ROUTES.USER.HOME} element={<Home />} />
            <Route path={ROUTES.USER.ABOUT} element={<About />} />
            <Route
              path={ROUTES.USER.PRODUCT_DETAIL}
              element={<ProductDetail />}
            />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ADMIN.CHART} element={<Chart />} />
          </Route>
        </Routes>
      </Suspense>
    </ConfigProvider>
  )
}

export default App
