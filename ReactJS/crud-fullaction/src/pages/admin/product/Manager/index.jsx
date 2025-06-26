import { Button, Modal, Space, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import * as S from './styles';

const Manager = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => alert(`Edit ${record.name}`)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            ghost
            danger
            onClick={showModal}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <S.ManagerContainer>
      <div>
        <b>Product List</b>
        <Button type="primary" ghost onClick={() => navigate(ROUTES.ADMIN.PRODUCT.CREATE)}>
          NEW
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Delete?</p>
      </Modal>
    </S.ManagerContainer>
  )
}

export default Manager
