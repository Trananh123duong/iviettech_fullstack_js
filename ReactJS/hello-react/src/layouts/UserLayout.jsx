import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import '../App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import userImg from '/user.png'

const UserLayout = () => {
  const [isShowSiderBar, setIsShowSiderBar] = useState(false)

  function toggleIsShowSiderBar() {
    setIsShowSiderBar(!isShowSiderBar)
  }

  return (
    <>
      <Header userImg={userImg} userName='Tran Anh Duong' toggleIsShowSiderBar={toggleIsShowSiderBar} />
      <div className='bodyPage'>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default UserLayout
