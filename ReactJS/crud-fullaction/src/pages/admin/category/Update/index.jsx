import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { getCategory, updateCategory } from '../../../../redux/thunks/category.thunk';
import * as S from './styles';

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let { id } = useParams();

  const { detailCategory } = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getCategory({ id }))
  }, [id])

  const handleUpdateCategory = (values) => {
    dispatch(
      updateCategory({
        id: id,
        data: values,
        callback: () => navigate(ROUTES.ADMIN.CATEGORY.MANAGER)
      })
    )
  }

  useEffect(() => {
    form.setFieldsValue({
      name: detailCategory.data.name,
    });
  }, [detailCategory.data.id]);

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
      <S.TitlePage>Update Category</S.TitlePage>

      <Form
        {...formItemLayout}
        form={form}
        initialValues={{
          name: detailCategory.name,
        }}
        style={{ maxWidth: 600 }}
        onFinish={(values) => handleUpdateCategory(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the category name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Submit
          </Button>
          <Button type="default" onClick={() => navigate(ROUTES.ADMIN.CATEGORY.MANAGER)}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Update;
