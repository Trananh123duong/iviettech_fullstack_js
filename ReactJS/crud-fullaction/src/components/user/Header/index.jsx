import { Avatar, Dropdown, Menu, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { logout } from '../../../redux/slices/auth.slice';
import * as S from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.myProfile.data?.username);

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

  const authButtons = (
    <>
      <Link to={ROUTES.USER.LOGIN}>
        <S.Button>Đăng nhập</S.Button>
      </Link>
      <Link to={ROUTES.USER.REGISTER}>
        <S.Button>Đăng ký</S.Button>
      </Link>
    </>
  );

  const profileTrigger = (
    <Dropdown overlay={profileMenu} trigger={['hover']} placement="bottomRight" arrow>
      <Space style={{ cursor: 'pointer', color: 'white' }}>
        <Avatar size={36} icon={<UserOutlined />} />
        <span>{username}</span>
      </Space>
    </Dropdown>
  );

  const rightContent = username ? profileTrigger : authButtons;

  return (
    <S.HeaderContainer>
      <S.NavLeft>
        <Link to={ROUTES.USER.HOME}>
          <S.Button>Home</S.Button>
        </Link>
      </S.NavLeft>

      <S.Title>USER HEADER</S.Title>

      <S.NavRight>{rightContent}</S.NavRight>
    </S.HeaderContainer>
  );
};

export default Header;
