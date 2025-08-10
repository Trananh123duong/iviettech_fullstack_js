import { Button, Form, Input, notification, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { register } from '../../../redux/thunks/auth.thunk';

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(
      register({
        data: {
          username: values.username,
          email: values.email,
          password: values.password,
          gender: values.gender || null,
          birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : null,
        },
        callback: () => {
          notification.success({
            message: 'Registration successful',
            description: 'You can now log in with your credentials.',
          });
          navigate(ROUTES.USER.LOGIN);
        },
      })
    );
  };

  const disableFuture = (current) => current && current > dayjs().endOf('day');

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Đăng ký</h2>
      <Form form={form} name="registerForm" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Select placeholder="Chọn giới tính" allowClear>
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
            <Option value="other">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Ngày sinh" name="birth_date">
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" disabledDate={disableFuture} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve();
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
