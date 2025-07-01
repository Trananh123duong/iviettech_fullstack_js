import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #aaaaaa;

  label {
    display: inline-block;
    margin: 8px 0 4px;
    font-weight: bold;
  }

  input {
    padding: 4px 6px;
    width: 100%;
    border: ${(props) => (props.error ? '1px solid red' : '1px solid #cccccc')};
  }
`

export const Button = styled.button`
  padding: 8px;
  width: 70px;
`

export const ButtonForm = styled.button`
  padding: 8px;
  margin-top: 16px;
  width: 100%;
`

export const SearchContainer = styled.div`
  padding-top: 16px;
  width: 100%;

  input {
    padding: 4px 6px;
    width: 80%;
    margin-right: 10px;
  }

  button {
    padding: 4px 6px;
    width: calc(100% - 80% - 10px);
  }
`