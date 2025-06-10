import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import '../App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import userImg from '/user.png'

const AdminLayout = () => {
  const [isShowSiderBar, setIsShowSiderBar] = useState(true)

  function toggleIsShowSoderBar() {
    setIsShowSiderBar(!isShowSiderBar)
  }

  return (
    <>
      <Header userImg={userImg} userName='Tran Anh Duong' toggleIsShowSoderBar={toggleIsShowSoderBar} />
      <div className='bodyPage'>
        <Sidebar isShowSiderBar={isShowSiderBar} toggleIsShowSoderBar={toggleIsShowSoderBar}/>
        <div className='contentPage'>
          <Outlet />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AdminLayout
