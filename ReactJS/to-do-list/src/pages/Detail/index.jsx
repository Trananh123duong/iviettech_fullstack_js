
const Detail = ({ title, content }) => {
  return (
    <div>
      <S.CardContainer>
        <h2>{title}</h2>
        <p>{content}</p>
      </S.CardContainer>
    </div>
  );
}

export default Detail
