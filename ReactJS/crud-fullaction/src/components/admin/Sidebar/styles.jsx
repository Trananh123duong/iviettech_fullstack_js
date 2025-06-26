import styled from 'styled-components'

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: #2D2D44;
  color: white;
  padding: 16px;
  min-height: 100%;
  position: absolute;
  top: 60px;
  left: ${props => props.isSidebarOpen ? 0 : '-200px'};
  transition: left 0.3s;

  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 12px;
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    display: block;
    padding: 8px;
    border-radius: 4px;

    &:hover {
      background-color: #4B4B73;
    }
  }
`