import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import * as S from './styles';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <S.SidebarContainer isSidebarOpen={isSidebarOpen}>
      <ul>
        <li><Link>Dashboard</Link></li>
        <li><Link to={ROUTES.ADMIN.PRODUCT.MANAGER}>Product</Link></li>
      </ul>
    </S.SidebarContainer>
  )
}

export default Sidebar
