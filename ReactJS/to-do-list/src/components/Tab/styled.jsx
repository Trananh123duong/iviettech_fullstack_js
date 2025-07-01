import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #aaaaaa;
  margin-top: 16px;

  label {
    display: inline-block;
    margin: 8px 0 4px;
    font-weight: bold;
  }

  input {
    padding: 4px 6px;
    width: 100%;
  }
`

export const ActionButton = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 8px;
`

export const Button = styled.button`
  padding: 8px;
  width: 70px;
`