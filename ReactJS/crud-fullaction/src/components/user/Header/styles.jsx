import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: #1E1E2F;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  color: white;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  color: white;
`

export const NavLeft = styled.div`
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    margin-right: 20px;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const NavRight = styled.div`
  display: flex;
  gap: 10px;
`

export const Button = styled.button`
  background-color: white;
  color: #1E1E2F;
  font-weight: bold;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #ccc;
  }
`
