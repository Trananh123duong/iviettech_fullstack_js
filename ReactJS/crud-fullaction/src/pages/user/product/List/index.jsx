import { Button, Card } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as S from './styles';

const List = () => {
  const { Meta } = Card;
  const [visibleCount, setVisibleCount] = useState(4);
  const { listProduct } = useSelector((state) => state.product)

  const renderListProduct = () => {
    return listProduct.slice(0, visibleCount).map((item) => (
      <Card
        key={item.id}
        hoverable
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <Meta title={item.name} description={item.price} />
      </Card>
    ))
  }

  const renderButton = () => {
    if (listProduct.length > visibleCount) {
      return <Button type="primary" onClick={() => setVisibleCount(visibleCount => visibleCount + 4)}>SHOW MORE</Button>
    }
  }

  return (
    <>
      <S.ListProduct>
        {renderListProduct()}
      </S.ListProduct>
      <S.CenterButton>
        {renderButton()}
      </S.CenterButton>
    </>
  )
}

export default List
