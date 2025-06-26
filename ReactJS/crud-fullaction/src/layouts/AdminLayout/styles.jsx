import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 16px;
  margin-left: ${props => props.isSidebarOpen ? "200px" : 0};
  transition: right 0.3s;
`