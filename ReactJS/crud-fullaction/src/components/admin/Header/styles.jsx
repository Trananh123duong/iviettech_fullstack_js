import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #1E1E2F;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;

  & svg {
    color: white;
    font-size: 32px;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px;
  }
  & svg:hover {
    background-color: #4B4B73;
  }
`;

export const Center = styled.p`
  flex: 1;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  margin: 0;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;
