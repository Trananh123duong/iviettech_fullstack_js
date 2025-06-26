import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: #1E1E2F;
  height: 60px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & svg {
    position: absolute;
    left: 20px;
    top: 10px;
    color: white;
    font-size: 40px;
    cursor: pointer;
    border-radius: 4px;
    padding: 5px;
  }
  & svg:hover {
    background-color: #4B4B73;
  }

  & p {
    color: white;
    font-weight: bold;
    font-size: 30px;
    margin: 0;
  }
`