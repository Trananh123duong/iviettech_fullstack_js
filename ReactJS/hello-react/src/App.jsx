import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLayout from './layouts/adminLayout'
import UserLayout from './layouts/userLayout'
import Chart from './pages/admin/Chart'
import Dashboard from './pages/admin/Dashboard'
import About from './pages/user/About'
import Detail from './pages/user/Detail'
import Home from './pages/user/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}/>
          <Route path='about' element={<About />} />
          <Route path='detail/:path' element={<Detail />} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='chart' element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
