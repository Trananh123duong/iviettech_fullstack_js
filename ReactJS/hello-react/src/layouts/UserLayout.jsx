import { useState } from 'react'
import { generatePath, Link, Outlet } from 'react-router-dom'
import '../App.css'
import userImg from '../assets/images/user.png'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ROUTES } from '../constants/routes'

const UserLayout = () => {
  const [isShowSiderBar, setIsShowSiderBar] = useState(false)

  function toggleIsShowSiderBar() {
    setIsShowSiderBar(!isShowSiderBar)
  }

  const detailUrl = generatePath(ROUTES.USER.DETAIL, { path: 1234 })

  return (
    <>
      <Header userImg={userImg} userName='Tran Anh Duong' toggleIsShowSiderBar={toggleIsShowSiderBar} />
      <div className='bodyPage'>
        <Outlet />
        <ul>
          <li><Link to={ROUTES.USER.HOME}>Home</Link></li>
          <li><Link to={ROUTES.USER.ABOUT}>About</Link></li>
          <li><Link to={detailUrl}>Detail</Link></li>
        </ul>
      </div>
      <Footer/>
    </>
  )
}

export default UserLayout
