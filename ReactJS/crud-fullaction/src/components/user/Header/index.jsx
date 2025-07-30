import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import * as S from './styles'

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.NavLeft>
        <Link to={ROUTES.USER.HOME}>
          <S.Button>Home</S.Button>
        </Link>
      </S.NavLeft>

      <S.Title>USER HEADER</S.Title>

      <S.NavRight>
        <Link to={ROUTES.USER.LOGIN}>
          <S.Button>Đăng nhập</S.Button>
        </Link>
        <Link to={ROUTES.USER.REGISTER}>
          <S.Button>Đăng ký</S.Button>
        </Link>
      </S.NavRight>
    </S.HeaderContainer>
  )
}

export default Header
