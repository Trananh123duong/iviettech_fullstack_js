import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLayout from './layouts/adminLayout'
import UserLayout from './layouts/userLayout'
import Chart from './pages/admin/Chart'
import Dashboard from './pages/admin/Dashboard'
import About from './pages/user/About'
import Detail from './pages/user/Detail'
import Home from './pages/user/Home'
import { ROUTES } from './constants/routes'

function App() {

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<Home />}/>
        <Route path={ROUTES.USER.ABOUT} element={<About />} />
        <Route path={ROUTES.USER.DETAIL} element={<Detail />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ADMIN.CHART} element={<Chart />} />
      </Route>
    </Routes>
  )
}

export default App
