import React, { useState } from 'react';
import { Button, Form, Input, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook, updateBook } from '../../redux/book.slice';

const Management = () => {
	const [form] = Form.useForm();
	
	const dispatch = useDispatch();
	const { listBook } = useSelector(state => state.book);
	const [editingId, setEditingId] = useState(null);

	const onFinish = (values) => {
    if (editingId) {
      dispatch(updateBook({ id: editingId, ...values }));
      setEditingId(null);
    } else {
      dispatch(addBook(values));
    }
    form.resetFields();
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingId(record.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteBook({ id }));
  };

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Author',
			dataIndex: 'author',
			key: 'author',
		},
		{
			title: 'Year',
			dataIndex: 'year',
			key: 'year',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
			),
		},
	];
	
  return (
		<>
			<Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input placeholder="Enter author" />
        </Form.Item>
        <Form.Item name="year" label="Year" rules={[{ required: true }]}>
          <Input placeholder="Enter year" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">{editingId ? 'Update Book' : 'Add Book'}</Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={listBook} rowKey="id" />
		</>
  )
}

export default Management
