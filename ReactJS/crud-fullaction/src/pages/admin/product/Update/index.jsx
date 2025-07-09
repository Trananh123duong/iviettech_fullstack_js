import { Button, Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { setDetailProduct, updateProduct } from '../../../../redux/slices/product.slice';
import * as S from './styles';

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  const { detailProduct } = useSelector(state => state.product)

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(setDetailProduct({ id }))
  }, [id])

  useEffect(() => {
      if (detailProduct?.id) {
        form.setFieldsValue(detailProduct);
      }
  }, [detailProduct]);

  const handleUpdateProduct = (values) => {
    dispatch(updateProduct({ ...values, id }))
    navigate(ROUTES.ADMIN.PRODUCT.MANAGER)
  }

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
      <S.TitlePage>Update Product</S.TitlePage>

      <Form
        {...formItemLayout}
        form={form}
        initialValues={detailProduct}
        style={{ maxWidth: 600 }}
        onFinish={(values) => handleUpdateProduct(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the product name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Submit
          </Button>
          <Button type="default" onClick={() => navigate(ROUTES.ADMIN.PRODUCT.MANAGER)}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Update;
