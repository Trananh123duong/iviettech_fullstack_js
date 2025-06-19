import * as S from './styled'

const Sidebar = ({isShowSiderBar, toggleIsShowSiderBar}) => {
  return (
    <S.SidebarContainer isShowSiderBar={isShowSiderBar}>
      <button type="button" className="menuButton btn btn-danger"  onClick={toggleIsShowSiderBar}>Close</button>
      
      <menu id="menu">
        <ul>
          <li>Danh sach</li>
          <li>The loai</li>
          <li>Theo doi</li>
        </ul>
      </menu>
    </S.SidebarContainer>
  )
}

export default Sidebar
