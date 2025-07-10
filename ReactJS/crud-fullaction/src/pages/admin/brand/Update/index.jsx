import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { getBrand, updateBrand } from '../../../../redux/thunks/brand.thunk';
import * as S from './styles';

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let { id } = useParams();

  const { detailBrand } = useSelector(state => state.brand)

  useEffect(() => {
    dispatch(getBrand({ id }))
  }, [id])

  const handleUpdateBrand = (values) => {
    dispatch(
      updateBrand({
        id: id,
        data: values,
        callback: () => navigate(ROUTES.ADMIN.BRAND.MANAGER)
      })
    )
  }

  useEffect(() => {
    form.setFieldsValue({
      name: detailBrand.data.name,
    });
  }, [detailBrand.data.id]);

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
      <S.TitlePage>Update Brand</S.TitlePage>

      <Form
        {...formItemLayout}
        form={form}
        initialValues={{
          name: detailBrand.name,
        }}
        style={{ maxWidth: 600 }}
        onFinish={(values) => handleUpdateBrand(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the brand name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
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

export default Update;
