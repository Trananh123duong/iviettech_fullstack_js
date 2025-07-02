import React from 'react';
import { Button, Form, Input, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook} from '../../redux/book.slice';
import { useNavigate } from 'react-router-dom';

const Management = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { listBook } = useSelector(state => state.book);

	const onFinish = (values) => {
    dispatch(addBook(values));
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
          <Button type="link" onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
			),
		},
	];
	
  return (
		<>
			<h1>Book Management</h1>
			<Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title">
          <Input/>
        </Form.Item>
        <Form.Item name="author" label="Author">
          <Input/>
        </Form.Item>
        <Form.Item name="year" label="Year">
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Book</Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={listBook} rowKey="id" />
		</>
  )
}

export default Management
