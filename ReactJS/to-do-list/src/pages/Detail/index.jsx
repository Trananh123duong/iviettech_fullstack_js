import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styled';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Lấy tabList từ redux
  const { tabList } = useSelector((state) => state.tab);

  // Tìm tab theo id
  const tab = tabList.find((item) => item.id === id);

  if (!tab) {
    return <div>Tab not found</div>
  }

  return (
    <S.DetailContainer>
      <h1>Detail Page</h1>
      <S.CardContainer>
        <h2>{tab.title}</h2>
        <p>{tab.content}</p>
      </S.CardContainer>
      <S.Button onClick={() => navigate(-1)}>Back</S.Button>
    </S.DetailContainer>
  );
}

export default Detail;
