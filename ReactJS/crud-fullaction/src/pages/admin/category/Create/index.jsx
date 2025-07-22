import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { createCategory, getCategories } from '../../../../redux/thunks/category.thunk';
import * as S from './styles';

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { createCategoryData } = useSelector((state) => state.category)

  const handleAddCategory = (values) => {
    dispatch(
      createCategory({
        data: values,
        callback: () => navigate(ROUTES.ADMIN.CATEGORY.MANAGER)
      })
    )
  }

  useEffect(() => {
    dispatch(getCategories())
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
      <S.TitlePage>Create Category</S.TitlePage>

      <Form
        {...formItemLayout}
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={(values) => handleAddCategory(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the category name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 8 }}
            loading={createCategoryData.loading === 'loading'}
          >
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

export default Create;
