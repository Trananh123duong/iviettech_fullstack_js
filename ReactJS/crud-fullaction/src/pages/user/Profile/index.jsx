import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Descriptions, Row } from 'antd';
import { useSelector } from 'react-redux';
import * as S from './styles';

const Profile = () => {
  const user = useSelector((state) => state.auth.myProfile.data);

  return (
    <S.PageRow justify="center">
      <Col xs={22} sm={18} md={14} lg={10}>
        <S.ProfileCard bordered hoverable>
          <S.HeaderBox>
            <Avatar size={64} icon={<UserOutlined />} />
            <S.Username level={3}>
              {user.username || 'Chưa có tên'}
            </S.Username>
          </S.HeaderBox>

          <S.InfoDescriptions column={1} bordered size="middle">
            <Descriptions.Item label="Username">
              {user.username || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {user.email || 'N/A'}
            </Descriptions.Item>
          </S.InfoDescriptions>
        </S.ProfileCard>
      </Col>
    </S.PageRow>
  );
};

export default Profile;
