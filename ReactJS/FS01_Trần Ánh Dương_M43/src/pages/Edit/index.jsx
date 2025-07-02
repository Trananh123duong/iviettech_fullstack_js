import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../../redux/book.slice';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { listBook } = useSelector(state => state.book);

  useEffect(() => {
    const book = listBook.find(item => item.id === id);
    if (book) {
      form.setFieldsValue(book);
    }
  }, [id]);

  const onFinish = (values) => {
    dispatch(updateBook({ id, ...values }));
    navigate('/');
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Author">
        <Input />
      </Form.Item>
      <Form.Item name="year" label="Year">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Update Book</Button>
      </Form.Item>
    </Form>
  );
}

export default Edit
