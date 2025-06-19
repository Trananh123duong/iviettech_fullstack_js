import styled, { css } from 'styled-components'

export const TabsContainer = styled.div`
  padding: 20px;
  width: 100%;
  /* margin-left: ${props => props.isShowSiderBar ? '200px' : '0px'};
  width: ${props => props.isShowSiderBar ? 'calc(100% - 200px)' : '100%'}; */

  ${
    props => props.isShowSiderBar && css`
      margin-left: 200px;
      width: calc(100% - 200px);
    `
  }
`

export const TabButtons = styled.div`
  display: flex;
  overflow: hidden;
  width: 300px;
`

export const TabButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  cursor: pointer;
  border-right: none;
  font-size: 14px;
  color: #333;
  width: 75px;

  ${
    props => props.isActive ? css`
      background-color: white;
      font-weight: bold;
      border-bottom: none;
    ` : css`
      background-color: #f5f5f5;
      border-bottom: 1px solid #ccc;
    `
  }

  &:last-child {
    border-right: 1px solid black;
  }

  &:hover {
    background-color: #e0e0e0;
  }
`

export const TabContent = styled.div`
  width: 300px;
  padding: 20px;
  background-color: white;
  font-weight: bold;
`