import styled from 'styled-components'
import { Table } from 'antd'

export const ManagerContainer = styled.div`
  width: 100%;

  & b {
    font-size: 30px;
  }
  & > div {
    display: flex;
    justify-content: space-between
  }
`

export const CustomTable = styled(Table)`
  & > div {
    width: 100%;
  }
`