import React from 'react'
import * as S from './styles'
import { Button, Flex, Table } from 'antd';

const index = () => {
  const dataSource = [
    {
      key: '1',
      id: '001',
      name: 'Sản phẩm A',
      price: 100000,
    },
    {
      key: '2',
      id: '002',
      name: 'Sản phẩm B',
      price: 200000,
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text.toLocaleString()} đ`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => alert(`Xoá ${record.name}`)}>
          Delete
        </Button>
      ),
    },
  ];
  return (
    <S.ManagerContainer>
      <div>
        <b>Product List</b>
        <Button type="primary" ghost>
          NEW
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
    </S.ManagerContainer>
  )
}

export default index
