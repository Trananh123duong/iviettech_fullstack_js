import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: gainsboro;
  height: 60px;
  width: 100%;

  & > div {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const UserConatiner = styled.div`
  display: flex;
  align-items: center;
`