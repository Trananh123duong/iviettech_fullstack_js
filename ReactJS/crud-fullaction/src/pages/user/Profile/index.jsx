import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Descriptions, Row, Form, Input, Button, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const Profile = () => {
  const user = useSelector((state) => state.auth.myProfile.data);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // TODO: dispatch cập nhật ở đây
    // console.log(values);
  };

  return (
    <Row gutter={[24, 24]} justify="center" style={{ marginTop: 40 }}>
      {/* Bên trái: hiển thị thông tin như hiện tại */}
      <Col xs={22} md={10} lg={10}>
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

      {/* Bên phải: form cập nhật cơ bản */}
      <Col xs={22} md={14} lg={12}>
        <Card bordered hoverable>
          <Title level={4} style={{ marginTop: 0 }}>Cập nhật thông tin</Title>

          <Form
            form={form}
            layout="vertical"
            initialValues={{ username: user?.username || '', email: user?.email || '' }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập username' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input />
            </Form.Item>

            <Title level={5} style={{ marginTop: 8 }}>Đổi mật khẩu (tuỳ chọn)</Title>

            <Form.Item label="Mật khẩu hiện tại" name="oldPassword">
              <Input.Password />
            </Form.Item>

            <Form.Item label="Mật khẩu mới" name="newPassword">
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const newPw = getFieldValue('newPassword');
                    if (!newPw && !value) return Promise.resolve(); // không đổi mật khẩu
                    if (newPw && value !== newPw) return Promise.reject(new Error('Mật khẩu nhập lại không khớp'));
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
