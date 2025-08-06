import { Button as AntButton, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { logout } from '../../../redux/slices/auth.slice';
import * as S from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.myProfile.data.username);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.USER.HOME);
  };

  const handleGoToProfile = () => {
    navigate(ROUTES.USER.PROFILE);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <S.HeaderContainer>
      <S.NavLeft>
        <Link to={ROUTES.USER.HOME}>
          <S.Button>Home</S.Button>
        </Link>
      </S.NavLeft>

      <S.Title>USER HEADER</S.Title>

      <S.NavRight>
        {!username ? (
          <>
            <Link to={ROUTES.USER.LOGIN}>
              <S.Button>Đăng nhập</S.Button>
            </Link>
            <Link to={ROUTES.USER.REGISTER}>
              <S.Button>Đăng ký</S.Button>
            </Link>
          </>
        ) : (
          <Dropdown overlay={userMenu} trigger={['hover']} placement="bottomRight" arrow>
            <AntButton
              type="text"
              style={{ color: 'white' }}
              onClick={handleGoToProfile}
            >
              {username}
            </AntButton>
          </Dropdown>
        )}
      </S.NavRight>
    </S.HeaderContainer>
  );
};

export default Header;
