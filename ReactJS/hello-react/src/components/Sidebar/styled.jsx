import styled from 'styled-components'

export const SidebarContainer = styled.div`
  position: absolute;
  top: 60px;
  left: ${props => props.isShowSiderBar ? 0 : '-200px'};
  width: 200px;
  padding: 16px;
  background-color: yellow;
  min-height: calc(100vh - 110px);
  transition: left 0.3s;
`