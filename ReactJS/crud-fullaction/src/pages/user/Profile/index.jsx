import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card, Col,
  DatePicker,
  Descriptions,
  Form, Input,
  Radio,
  Row,
  Typography,
  Upload
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, uploadAvatar } from '../../../redux/thunks/user.thunk';
import { END_POINT } from '../../../services/api';

const { Title } = Typography;

const GENDER_OPTIONS = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
];

const dateFormat = 'DD/MM/YYYY';

const Profile = () => {
  const user = useSelector((state) => state.auth.myProfile.data);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [avatarUrl, setAvatarUrl] = useState(null);

  const updating = useSelector(
    (state) => state.user.updateUserData.status === 'loading'
  );
  const uploading = useSelector(
    (state) => state.user.uploadAvatarData?.status === 'loading'
  );

  useEffect(() => {
    if (!user?.avatar) {
      setAvatarUrl(null);
    } else {
      const url = `${END_POINT.replace(/\/+$/,'')}/${user.avatar.replace(/^\/+/, '')}`;
      setAvatarUrl(url);
    }
  }, [user?.avatar, END_POINT]);

  const onFinish = (values) => {
    const payload = {
      username: values.username,
      email: values.email,
      gender: values.gender ?? null,
      birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : null,
    };

    if (values.oldPassword || values.newPassword || values.confirmPassword) {
      if (!values.oldPassword || !values.newPassword || !values.confirmPassword) {
        return alert('Vui lòng nhập đủ 3 trường mật khẩu khi đổi mật khẩu.');
      }
      payload.oldPassword = values.oldPassword;
      payload.newPassword = values.newPassword;
    }

    dispatch(
      updateUser({
        id: user.id,
        data: payload,
        callback: () => {
          alert('Cập nhật thành công');
        },
      })
    ).catch((err) => {
      alert(err?.message || 'Cập nhật thất bại');
    });
  };

  // Validate file (đuôi + size), tạo FormData và dispatch thunk
  const handleBeforeUpload = (file) => {
    const isImg = /image\/(jpeg|jpg|png)/.test(file.type);
    if (!isImg) {
      alert('Chỉ chấp nhận JPEG/JPG/PNG');
      return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      alert('Kích thước tối đa 5MB');
      return Upload.LIST_IGNORE;
    }

    const formData = new FormData();
    formData.append('avatar', file); // field name khớp với upload.single('avatar')

    dispatch(
      uploadAvatar({
        formData,
        callback: (res) => {
          const url = res.avatarUrl.startsWith('http')
            ? res.avatarUrl
            : `${END_POINT}/${res.avatarUrl}`;
          setAvatarUrl(url);
          alert('Upload avatar thành công');
        },
      })
    ).catch((err) => {
      alert(err?.message || 'Upload thất bại');
    });

    // Ngăn antd auto upload vì mình đã tự xử lý
    return Upload.LIST_IGNORE;
  };

  return (
    <Row gutter={[24, 24]} justify="center" style={{ marginTop: 40 }}>
      {/* Left: current info */}
      <Col xs={22} md={10} lg={10}>
        <Card bordered hoverable>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar
              size={96}
              src={avatarUrl}
              icon={!avatarUrl ? <UserOutlined /> : undefined}
              style={{ border: '1px solid #f0f0f0' }}
            />
            <div style={{ marginTop: 12 }}>
              <Upload
                accept="image/png,image/jpeg"
                showUploadList={false}
                beforeUpload={handleBeforeUpload}
              >
                <Button loading={uploading} size="small">
                  {uploading ? 'Đang tải...' : 'Đổi ảnh đại diện'}
                </Button>
              </Upload>
            </div>

            <Title level={3} style={{ marginTop: 16 }}>
              {user?.username || 'Chưa có tên'}
            </Title>
          </div>

          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Username">{user?.username || ''}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email || ''}</Descriptions.Item>
            <Descriptions.Item label="Quyền">{user?.role || 'user'}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {user?.gender
                ? ({ male: 'Nam', female: 'Nữ', other: 'Khác' }[user.gender] || 'Khác')
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {user?.birth_date ? dayjs(user.birth_date).format(dateFormat) : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Tạo lúc">
              {user?.created_at ? dayjs(user.created_at).format('DD/MM/YYYY HH:mm') : ''}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>

      {/* Right: update form */}
      <Col xs={22} md={14} lg={12}>
        <Card bordered hoverable>
          <Title level={4} style={{ marginTop: 0 }}>Cập nhật thông tin</Title>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              username: user?.username || '',
              email: user?.email || '',
              gender: user?.gender ?? undefined,
              birth_date: user?.birth_date ? dayjs(user.birth_date) : null,
            }}
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

            <Form.Item label="Giới tính" name="gender">
              <Radio.Group options={GENDER_OPTIONS} optionType="button" />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="birth_date"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) return Promise.resolve();
                    if (value.isAfter(dayjs(), 'day')) {
                      return Promise.reject(new Error('Ngày sinh không được ở tương lai'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker format={dateFormat} style={{ width: '100%' }} />
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
                    if (newPw && value !== newPw) {
                      return Promise.reject(new Error('Mật khẩu nhập lại không khớp'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={updating}>
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
