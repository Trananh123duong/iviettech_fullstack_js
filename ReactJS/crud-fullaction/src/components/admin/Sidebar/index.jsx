import React from 'react'
import * as S from './styles'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes'

const index = () => {
  return (
    <S.SidebarContainer>
      <ul>
        <li><Link>Dashboard</Link></li>
        <li><Link to={ROUTES.ADMIN.PRODUCT.MANAGER}>Product</Link></li>
      </ul>
    </S.SidebarContainer>
  )
}

export default index
