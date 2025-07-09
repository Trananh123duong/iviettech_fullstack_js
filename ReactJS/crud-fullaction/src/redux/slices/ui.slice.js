import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: true
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
      console.log(state.isSidebarOpen)
    }
  }
})

export const { toggleSidebar } = uiSlice.actions

export default uiSlice.reducer