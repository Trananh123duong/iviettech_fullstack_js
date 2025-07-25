import { Button, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { deleteCategory, getCategories } from '../../../../redux/thunks/category.thunk';
import * as S from './styles';

const Manager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const showModal = (id) => {
    setDeleteId(id)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(
      deleteCategory({
        id: deleteId,
        callback: () => dispatch(getCategories()),
      })
    )
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { listCategory } = useSelector((state) => state.category)

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
      title: 'Count',
      dataIndex: 'product_count',
      key: 'product_count'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => navigate(generatePath(ROUTES.ADMIN.CATEGORY.UPDATE, { id: record.id }))}
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
        <b>Category List</b>
        <Button
          type="primary"
          ghost
          onClick={() => navigate(ROUTES.ADMIN.CATEGORY.CREATE)}
        >
          NEW
        </Button>
      </div>
      <S.CustomTable
        loading={listCategory.status === 'loading'}
        dataSource={listCategory.data}
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
        <p>Delete category id: { deleteId }</p>
      </Modal>
    </S.ManagerContainer>
  )
}

export default Manager
