import { Button, Flex, Input, Modal, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { ADMIN_PRODUCT_LIMIT } from '../../../../constants/paging';
import { ROUTES } from '../../../../constants/routes';
import { deleteProduct, getProducts } from '../../../../redux/thunks/product.thunk';
import { END_POINT } from '../../../../services/api';
import * as S from './styles';

const Manager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { listProduct } = useSelector((state) => state.product);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: ADMIN_PRODUCT_LIMIT,
  });
  const [sorterState, setSorterState] = useState({
    field: 'id',
    order: 'desc',
  });

  const fetchData = (
    page = pagination.current,
    limit = pagination.pageSize,
    sortField = sorterState.field,
    order = sorterState.order,
    q = searchText
  ) => {
    dispatch(
      getProducts({
        page,
        limit,
        sort: sortField,
        order, // 'asc' | 'desc'
        q,         // 👈 truyền keyword
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // mở/đóng modal xóa
  const showModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async () => {
    setIsModalOpen(false);
    await dispatch(
      deleteProduct({
        id: deleteId,
        callback: async () => {
          // nếu xóa xong, kiểm tra số item còn lại trong trang hiện tại
          const total = listProduct?.meta?.total ?? 0;
          const pageSize = pagination.pageSize;
          // Số item còn lại nếu refetch cùng total (ước lượng: total - 1)
          const newTotal = Math.max(0, total - 1);
          const maxPage = Math.max(1, Math.ceil(newTotal / pageSize));
          const nextPage = Math.min(pagination.current, maxPage);

          setPagination((prev) => ({ ...prev, current: nextPage }));
          fetchData(nextPage, pageSize, sorterState.field, sorterState.order);
        },
      })
    );
  };

  // mapping sorter từ antd -> BE
  const mapAntdOrderToApi = (antdOrder) => {
    if (antdOrder === 'ascend') return 'asc';
    if (antdOrder === 'descend') return 'desc';
    return 'asc';
  };

  // Table onChange
  const handleTableChange = (paginationInfo, _filters, sorter) => {
    console.log(paginationInfo);
    const nextPage = paginationInfo.current;
    const nextPageSize = paginationInfo.pageSize;

    const sortField =
      sorter?.field && ['id', 'name', 'price'].includes(sorter.field)
      ? sorter.field
      : 'id';
    const sortOrder = mapAntdOrderToApi(sorter?.order);

    setPagination({ current: nextPage, pageSize: nextPageSize });
    setSorterState({ field: sortField, order: sortOrder });

    fetchData(nextPage, nextPageSize, sortField, sortOrder);
  };

  const onSearch = (value) => {
    setSearchText(value);
    const nextPage = 1;
    setPagination((prev) => ({ ...prev, current: nextPage }));
    fetchData(
      nextPage,
      pagination.pageSize,
      sorterState.field,
      sorterState.order,
      value
    );
  };

  const onChangeSearch = (e) => setSearchText(e.target.value);

  const columns = useMemo(() => ([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) =>
        image && (
          <img
            src={`${END_POINT}/${image}`}
            alt="Product"
            style={{ width: 50, height: 50, objectFit: 'cover' }}
          />
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => record?.Category?.name || '-',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      render: (val) => {
        const n = Number(val);
        return Number.isFinite(n) ? `${n.toLocaleString()} đ` : `${val} đ`;
      },
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
  ]), [navigate]);

  return (
    <S.ManagerContainer>
      <div>
        <b>Product List</b>
        <Flex gap={12} align="center">
          <Input.Search
            value={searchText}
            onChange={onChangeSearch}
            onSearch={onSearch}
            allowClear
            placeholder="Search by name..."
            style={{ width: 280 }}
          />
          <Button
            type="primary"
            ghost
            onClick={() => navigate(ROUTES.ADMIN.PRODUCT.CREATE)}
          >
            NEW
          </Button>
        </Flex>
      </div>

      <S.CustomTable
        rowKey="id"
        loading={listProduct.status === 'loading'}
        dataSource={listProduct.data}
        columns={columns}
        // controlled pagination
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: listProduct?.meta?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        onChange={handleTableChange}
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Confirm delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Delete product id: {deleteId}</p>
      </Modal>
    </S.ManagerContainer>
  );
};

export default Manager;
