import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { getBrands } from '../../../../redux/thunks/brand.thunk';
import { createProduct } from '../../../../redux/thunks/product.thunk';
import * as S from './styles';

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { createProductData } = useSelector((state) => state.product)
  const { listBrand } = useSelector((state) => state.brand)

  const handleAddProduct = (values) => {
    dispatch(
      createProduct({
        data: values,
        callback: () => navigate(ROUTES.ADMIN.PRODUCT.MANAGER)
      })
    )
  }

  useEffect(() => {
    dispatch(getBrands())
  }, [])

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
      <S.TitlePage>Create Product</S.TitlePage>

      <Form
        {...formItemLayout}
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={(values) => handleAddProduct(values)}
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
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 8 }}
            loading={createProductData.loading === 'loading'}
          >
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

export default Create;
