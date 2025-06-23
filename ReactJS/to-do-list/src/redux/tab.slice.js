import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        tabList: []
    },
    reducers: {
        addTab: (state, action) => {
            const newTab = {
              id: uuidv4(),
              title: action.payload.title,
              content: action.payload.content
            };
            state.tabList.unshift(newTab)
        }
    }
})

export const { addTab } = tabSlice.actions

export default tabSlice.reducer