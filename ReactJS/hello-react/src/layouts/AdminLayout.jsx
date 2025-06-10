import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import '../App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import userImg from '/user.png'

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
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AdminLayout
