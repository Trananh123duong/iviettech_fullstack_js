import styled from 'styled-components';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #aaaaaa;
  margin-top: 16px;

  h2 {
    margin: 0 0 8px 0;
  }

  p {
    margin: 0;
  }
`;

export const Button = styled.button`
  padding: 8px;
  width: 70px;
  margin-top: 16px;
  align-self: flex-start;
`;
