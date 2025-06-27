import styled from 'styled-components'

export const ListProduct = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  & > div {
    width: calc((100% - 45px) / 4);
  }
`

export const CenterButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`