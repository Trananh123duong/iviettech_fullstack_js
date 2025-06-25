import React from 'react'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'
import { Outlet } from 'react-router-dom'
import * as S from './styles'

const index = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <Sidebar />
        <Outlet />
      </S.MainContainer>
    </>
  )
}

export default index
