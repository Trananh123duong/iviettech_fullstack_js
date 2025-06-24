import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    tabList: localStorage.getItem('listTabStorage') ? JSON.parse(localStorage.getItem('listTabStorage')) : []
  },
  reducers: {
    addTab: (state, action) => {
      const newTab = {
        id: uuidv4(),
        title: action.payload.title,
        content: action.payload.content
      };
      state.tabList.unshift(newTab)

      localStorage.setItem('listTabStorage', JSON.stringify(state.tabList));
    },
    destroyTab: (state, action) => {
      state.tabList = state.tabList.filter(item => item.id !== action.payload)
      localStorage.setItem('listTabStorage', JSON.stringify(state.tabList));
    },
    updateTab: (state, action) => {
      const index = state.tabList.findIndex(item => item.id === action.payload.id)

      state.tabList.splice(index, 1, {
        id: action.payload.id,
        title: action.payload.title,
        content: action.payload.content
      })

      localStorage.setItem('listTabStorage', JSON.stringify(state.tabList));
    }
  }
})

export const { addTab, destroyTab, updateTab } = tabSlice.actions

export default tabSlice.reducer