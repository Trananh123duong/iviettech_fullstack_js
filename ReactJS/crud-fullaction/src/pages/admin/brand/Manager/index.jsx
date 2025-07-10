import { Button, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { deleteBrand, getBrands } from '../../../../redux/thunks/brand.thunk';
import * as S from './styles';

const Manager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const showModal = (id) => {
    setDeleteId(id)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(
      deleteBrand({
        id: deleteId,
        callback: () => dispatch(getBrands()),
      })
    )
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { listBrand } = useSelector((state) => state.brand)

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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => navigate(generatePath(ROUTES.ADMIN.BRAND.UPDATE, { id: record.id }))}
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
        <b>Brand List</b>
        <Button
          type="primary"
          ghost
          onClick={() => navigate(ROUTES.ADMIN.BRAND.CREATE)}
        >
          NEW
        </Button>
      </div>
      <S.CustomTable
        loading={listBrand.status === 'loading'}
        dataSource={listBrand.data}
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
        <p>Delete brand id: { deleteId }</p>
      </Modal>
    </S.ManagerContainer>
  )
}

export default Manager
