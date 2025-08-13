import { Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCartItems } from '../../../redux/thunks/user.thunk';
import * as S from './styles';

const CartManager = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { cartList } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(getCartItems({ userId }));
    }
  }, [dispatch, userId]);

  const handleRefresh = () => {
    dispatch(getCartItems({ userId }));
  };

  // Chuẩn hoá dữ liệu: hỗ trợ cả 2 dạng trả về từ API
  // - Dạng CartItem.findAll + include Product:
  //     it.quantity, it.Product.{ id,name,price }
  // - Dạng belongsToMany(User<->Product):
  //     it là Product, quantity ở it.CartItem.quantity
  const rows = (cartList.items || []).map((it) => {
    const product = it.Product || it;
    const quantity = it.quantity ?? it?.CartItem?.quantity ?? 1;
    const price = Number(product.price || 0);
    const total = price * quantity;

    return {
      key: `${product.id}`,
      product_id: product.id,
      name: product.name,
      price,
      quantity,
      total,
    };
  });

  const columns = [
    { title: 'Product ID', dataIndex: 'product_id', key: 'product_id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (v) => Number(v).toLocaleString('vi-VN'),
    },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (v) => Number(v).toLocaleString('vi-VN'),
    },
  ];

  const grandTotal = rows.reduce((sum, r) => sum + r.total, 0);

  return (
    <S.ManagerContainer>
      <div>
        <b>Cart</b>
        <Button type="primary" ghost onClick={handleRefresh} style={{ marginLeft: 12 }}>
          Refresh
        </Button>
      </div>

      <S.CustomTable
        loading={cartList.status === 'loading'}
        dataSource={rows}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
        footer={() => (
          <div style={{ textAlign: 'right', fontWeight: 600 }}>
            Grand total: {grandTotal.toLocaleString('vi-VN')}
          </div>
        )}
      />
    </S.ManagerContainer>
  );
};

export default CartManager;
