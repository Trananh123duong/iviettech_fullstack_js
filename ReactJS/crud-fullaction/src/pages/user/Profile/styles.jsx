import styled from 'styled-components';
import { Row, Card, Typography, Descriptions } from 'antd';

export const PageRow = styled(Row)`
  margin-top: 40px;
`;

export const ProfileCard = styled(Card)`
  border-radius: 12px;

  .ant-card-body {
    padding: 24px;
  }
`;

export const HeaderBox = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const Username = styled(Typography.Title)`
  && {
    margin: 16px 0 0;
  }
`;

export const InfoDescriptions = styled(Descriptions)`
  .ant-descriptions-item-label {
    width: 160px;
    font-weight: 600;
  }
`;
