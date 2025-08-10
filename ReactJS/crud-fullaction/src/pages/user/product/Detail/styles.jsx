import styled from 'styled-components';

export const PageWrap = styled.div`
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 16px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const HeaderRightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ImageWrap = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

export const Price = styled.span`
  font-weight: 700;
  font-size: 20px;
  white-space: nowrap;
`;
