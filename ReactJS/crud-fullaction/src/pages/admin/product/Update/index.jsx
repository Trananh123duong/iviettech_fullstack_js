import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { getCategories } from '../../../../redux/thunks/category.thunk';
import { getProduct, updateProduct } from '../../../../redux/thunks/product.thunk';
import * as S from './styles';

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let { id } = useParams();

  const { detailProduct } = useSelector(state => state.product)
  const { listCategory } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getCategories())
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
      categoryId: detailProduct.data.categoryId,
      price: detailProduct.data.price,
    });
  }, [detailProduct.data.id]);

  const renderCategoryOptions = useMemo(() => {
    return listCategory.data.map((item) => {
      return <Select.Option value={item.id}>{item.name}</Select.Option>
    })
  }, [listCategory.data])

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
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Select
            placeholder="Enter category"
            loading={listCategory.status === 'loading'}
          >
            {renderCategoryOptions}
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
