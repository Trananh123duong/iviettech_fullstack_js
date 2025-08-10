import { LuSquareMenu } from 'react-icons/lu';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../redux/slices/ui.slice';
import { logout } from '../../../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import * as S from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.myProfile.data?.username);

  const toggelSidebar = () => dispatch(toggleSidebar());
  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.USER.HOME);
  };
  const handleGoToProfile = () => navigate(ROUTES.USER.PROFILE);

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleGoToProfile}>
        Hồ sơ
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const profileTrigger = username ? (
    <Dropdown overlay={profileMenu} trigger={['hover']} placement="bottomRight" arrow>
      <Space style={{ cursor: 'pointer', color: 'white' }}>
        <Avatar size={36} icon={<UserOutlined />} />
        <span>{username}</span>
      </Space>
    </Dropdown>
  ) : null;

  return (
    <S.HeaderContainer>
      <S.Left>
        <LuSquareMenu onClick={toggelSidebar} />
      </S.Left>

      <S.Center>ADMIN HEADER</S.Center>

      <S.Right>{profileTrigger}</S.Right>
    </S.HeaderContainer>
  );
};

export default Header;
