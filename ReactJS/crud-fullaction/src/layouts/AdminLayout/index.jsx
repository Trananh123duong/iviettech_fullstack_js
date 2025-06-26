import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'
import * as S from './styles'

const AdminLayout = () => {
  const isSidebarOpen = useSelector(state => state.ui.isSidebarOpen)
  return (
    <S.Container>
      <Header />
      <S.MainContainer>
        <Sidebar isSidebarOpen={isSidebarOpen}/>
        <S.ContentWrapper isSidebarOpen={isSidebarOpen}>
          <Outlet />
        </S.ContentWrapper>
      </S.MainContainer>
    </S.Container>
  )
}

export default AdminLayout
