import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import * as S from './styles';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <S.SidebarContainer isSidebarOpen={isSidebarOpen}>
      <ul>
        <li><Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link></li>
        <li><Link to={ROUTES.ADMIN.PRODUCT.MANAGER}>Product</Link></li>
        <li><Link to={ROUTES.ADMIN.BRAND.MANAGER}>Brand</Link></li>
        <li><Link to={ROUTES.ADMIN.CATEGORY.MANAGER}>Category</Link></li>
        <li><Link to={ROUTES.ADMIN.USER.MANAGER}>User</Link></li>
      </ul>
    </S.SidebarContainer>
  )
}

export default Sidebar
