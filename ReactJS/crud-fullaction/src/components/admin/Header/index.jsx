import { LuSquareMenu } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../redux/ui.slice';
import * as S from './styles';

const Header = () => {
  const dispatch = useDispatch();

  const toggelSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <S.HeaderContainer>
      <LuSquareMenu onClick={() => toggelSidebar()}/>
      <p>ADMIN HEADER</p>
    </S.HeaderContainer>
  )
}

export default Header
