import * as S from './styled'

const Header = ({userImg, userName, toggleIsShowSiderBar}) => {
  return (
    <S.HeaderContainer>
      <div>
        <button type="button" className="menuButton btn btn-info"  onClick={toggleIsShowSiderBar}>Menu</button>
        <S.UserConatiner>
          <img src={userImg} width="40px" height="40px" alt="" />
          <p>{userName}</p>
        </S.UserConatiner>
      </div>
    </S.HeaderContainer>
  )
}

export default Header
