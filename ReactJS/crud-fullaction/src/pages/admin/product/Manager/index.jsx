import { Button, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { deleteProduct, getProducts } from '../../../../redux/thunks/product.thunk';
import * as S from './styles';

const Manager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const showModal = (id) => {
    setDeleteId(id)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(
      deleteProduct({
        id: deleteId,
        callback: () => dispatch(getProducts()),
      })
    )
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { listProduct } = useSelector((state) => state.product)

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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      // render: (_, record) => record.brand.name,
      render: (_, record) => record.Category.name,
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
            onClick={() => navigate(generatePath(ROUTES.ADMIN.PRODUCT.UPDATE, { id: record.id }))}
          >
            Edit
          </Button>
          <Button
            type="primary"
            ghost
            danger
            onClick={() => showModal(record.id)}
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
        <Button
          type="primary"
          ghost
          onClick={() => navigate(ROUTES.ADMIN.PRODUCT.CREATE)}
        >
          NEW
        </Button>
      </div>
      <S.CustomTable
        loading={listProduct.status === 'loading'}
        dataSource={listProduct.data}
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
        <p>Delete product id: { deleteId }</p>
      </Modal>
    </S.ManagerContainer>
  )
}

export default Manager
