import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Descriptions, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const Profile = () => {
  const user = useSelector((state) => state.auth.myProfile.data);

  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col xs={22} sm={18} md={14} lg={10}>
        <Card bordered hoverable>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Title level={3} style={{ marginTop: 16 }}>
              {user.username || 'Chưa có tên'}
            </Title>
          </div>
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Username">{user.username || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email || 'N/A'}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
