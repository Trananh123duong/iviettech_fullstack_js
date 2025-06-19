import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../App.css'
import userImg from '../assets/images/user.png'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ROUTES } from '../constants/routes'

const AdminLayout = () => {
  const [isShowSiderBar, setIsShowSiderBar] = useState(true)

  function toggleIsShowSiderBar() {
    setIsShowSiderBar(!isShowSiderBar)
  }

  return (
    <>
      <Header userImg={userImg} userName='Tran Anh Duong' toggleIsShowSiderBar={toggleIsShowSiderBar} />
      <div className='bodyPage'>
        <Sidebar isShowSiderBar={isShowSiderBar} toggleIsShowSiderBar={toggleIsShowSiderBar}/>
        <div className='contentPage'>
          <Outlet />
          <ul>
            <li><Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link></li>
            <li><Link to={ROUTES.ADMIN.CHART}>Chart</Link></li>
          </ul>
          <Main />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AdminLayout
