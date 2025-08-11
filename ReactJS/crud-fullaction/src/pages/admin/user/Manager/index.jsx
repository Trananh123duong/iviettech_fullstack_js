import { Alert, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADMIN_PRODUCT_LIMIT } from '../../../../constants/paging';
import { getUsers, updateUserRole } from '../../../../redux/thunks/user.thunk';
import * as S from './styles';

const ROLE_OPTIONS = [
  { label: 'user', value: 'user' },
  { label: 'admin', value: 'admin' },
];

const Manager = () => {
  const dispatch = useDispatch();
  const { listUser, updateUserRoleData } = useSelector((s) => s.user);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: ADMIN_PRODUCT_LIMIT,
  });

  const fetchData = (page = pagination.current, limit = pagination.pageSize) => {
    dispatch(getUsers({ page, limit }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeRole = (userId, nextRole) => {
    dispatch(updateUserRole({ id: userId, role: nextRole }));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 160,
      render: (role, record) => (
        <Select
          value={role}
          options={ROLE_OPTIONS}
          style={{ width: 120 }}
          onChange={(val) => handleChangeRole(record.id, val)}
          disabled={
            listUser.status === 'loading' ||
            updateUserRoleData.status === 'loading'
          }
        />
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 110,
      render: (g) => ({ male: 'Nam', female: 'Nữ', other: 'Khác' }[g] || ''),
    },
    {
      title: 'Birth date',
      dataIndex: 'birth_date',
      key: 'birth_date',
      width: 140,
      render: (d) => (d ? dayjs(d).format('DD/MM/YYYY') : ''),
    },
  ];

  const handleTableChange = (paginationInfo) => {
    const nextPage = paginationInfo.current;
    const nextPageSize = paginationInfo.pageSize;
    setPagination({ current: nextPage, pageSize: nextPageSize });
    fetchData(nextPage, nextPageSize);
  };

  return (
    <S.ManagerContainer>
      <div>
        <b>User Manager</b>
      </div>

      {updateUserRoleData.status === 'succeeded' && (
        <Alert
          type="success"
          showIcon
          message="Cập nhật role thành công"
          style={{ marginBottom: 12 }}
        />
      )}
      {updateUserRoleData.status === 'failed' && (
        <Alert
          type="error"
          showIcon
          message={updateUserRoleData.error || 'Update role thất bại'}
          style={{ marginBottom: 12 }}
        />
      )}

      <S.CustomTable
        rowKey="id"
        loading={listUser.status === 'loading'}
        dataSource={listUser.data}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: listUser?.meta?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        onChange={handleTableChange}
        style={{ marginTop: 20 }}
      />
    </S.ManagerContainer>
  );
};

export default Manager;
