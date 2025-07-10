import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { getBrands } from '../../../../redux/thunks/brand.thunk';
import { getProduct, updateProduct } from '../../../../redux/thunks/product.thunk';
import * as S from './styles';

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let { id } = useParams();

  const { detailProduct } = useSelector(state => state.product)
  const { listBrand } = useSelector((state) => state.brand)

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getProduct({ id }))
  }, [id])

  const handleUpdateProduct = (values) => {
    dispatch(
      updateProduct({
        id: id,
        data: values,
        callback: () => navigate(ROUTES.ADMIN.PRODUCT.MANAGER)
      })
    )
  }

  useEffect(() => {
    form.setFieldsValue({
      name: detailProduct.data.name,
      brandId: detailProduct.data.brandId,
      price: detailProduct.data.price,
    });
  }, [detailProduct.data.id]);

  const renderBrandOptions = useMemo(() => {
    return listBrand.data.map((item) => {
      return <Select.Option value={item.id}>{item.name}</Select.Option>
    })
  }, [listBrand.data])

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
        initialValues={{
          name: detailProduct.name,
          price: detailProduct.price,
        }}
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
          label="Brand"
          name="brandId"
          rules={[{ required: true, message: 'Please input the brand!' }]}
        >
          <Select
            placeholder="Enter brand"
            loading={listBrand.status === 'loading'}
          >
            {renderBrandOptions}
          </Select>
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
