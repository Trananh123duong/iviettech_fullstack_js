// Detail.jsx
import { ArrowLeftOutlined, TagOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Descriptions, Image, Row, Tag, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { getProduct } from '../../../../redux/thunks/product.thunk';
import { addToCart } from '../../../../redux/thunks/user.thunk';

import * as S from './styles';
const { Title } = Typography;

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) => state.auth.myProfile.data);

  const addStatus = useSelector((state) => state.user.addToCartData.status);
  const isAdding = addStatus === 'loading';

  const { detailProduct } = useSelector((state) => state.product);
  const product = detailProduct?.data || {};
  const errorMsg = detailProduct?.error;

  useEffect(() => {
    if (id) dispatch(getProduct({ id }));
  }, [id, dispatch]);

  const categoryName = useMemo(() => {
    return product?.Category?.name || product?.category?.name || 'Chưa phân loại';
  }, [product]);

  const priceText = useMemo(() => {
    const price = product?.price;
    if (price === undefined || price === null) return 'N/A';
    try {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
    } catch {
      return String(price);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!user?.id) {
      alert('Vui lòng đăng nhập trước khi thêm vào giỏ hàng');
      return navigate(ROUTES.USER.LOGIN || '/login');
    }
    if (!id) return;

    dispatch(
      addToCart({
        userId: user.id,
        productId: Number(id),
        callback: () => {
          alert('Đã thêm vào giỏ hàng');
        },
      })
    ).catch((err) => {
      alert(err?.message || 'Thêm vào giỏ hàng thất bại');
    });
  };

  const headerActions = (
    <S.HeaderRightWrap>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.USER.PRODUCT.LIST)}>
        Quay lại
      </Button>
    </S.HeaderRightWrap>
  );

  return (
    <S.PageWrap>
      <S.PageHeader>
        <Title level={3} style={{ margin: 0 }}>
          Chi tiết sản phẩm
        </Title>
        {headerActions}
      </S.PageHeader>

      {errorMsg && <Alert type="error" message={errorMsg} showIcon style={{ marginBottom: 16 }} />}

      <Card bordered>
        <Row gutter={[24, 24]}>
          {/* Left: Image */}
          <Col xs={24} md={10} lg={9}>
            <S.ImageWrap>
              <Image
                src={'https://placehold.co/300x300'}
                width="100%"
                height={360}
                style={{ objectFit: 'cover' }}
                alt={product?.name || 'product'}
                preview={false}
              />
            </S.ImageWrap>
          </Col>

          {/* Right: Info */}
          <Col xs={24} md={14} lg={15}>
            <S.TitleWrap>
              <Title level={3} style={{ margin: 0 }}>
                {product?.name || 'N/A'}
              </Title>
              <S.Price>{priceText}</S.Price>
            </S.TitleWrap>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Mã sản phẩm">{product?.id ?? 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                <Tag icon={<TagOutlined />}>{categoryName}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Giá">{priceText}</Descriptions.Item>
            </Descriptions>

            <Button
              type="primary"
              block
              style={{ marginTop: 16 }}
              onClick={handleAddToCart}
              loading={isAdding}
            >
              Thêm vào giỏ hàng
            </Button>
          </Col>
        </Row>
      </Card>
    </S.PageWrap>
  );
};

export default Detail;
