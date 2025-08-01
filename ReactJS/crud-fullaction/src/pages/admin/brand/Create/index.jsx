import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { createBrand, getBrands } from '../../../../redux/thunks/brand.thunk';
import * as S from './styles';

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { createBrandData } = useSelector((state) => state.brand)

  const handleAddBrand = (values) => {
    dispatch(
      createBrand({
        data: values,
        callback: () => navigate(ROUTES.ADMIN.BRAND.MANAGER)
      })
    )
  }

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <>
      <S.TitlePage>Create Brand</S.TitlePage>

      <Form
        {...formItemLayout}
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={(values) => handleAddBrand(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the brand name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 8 }}
            loading={createBrandData.loading === 'loading'}
          >
            Submit
          </Button>
          <Button type="default" onClick={() => navigate(ROUTES.ADMIN.BRAND.MANAGER)}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Create;
