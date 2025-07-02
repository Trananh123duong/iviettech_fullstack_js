import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    listBook: localStorage.getItem('listBookStorage') ? JSON.parse(localStorage.getItem('listBookStorage')) : [],
    detailBook: {}
  },
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        id: uuidv4(),
        title: action.payload.title,
        author: action.payload.author,
        year: action.payload.year
      };
      state.listBook.unshift(newBook)

      localStorage.setItem('listBookStorage', JSON.stringify(state.listBook));
    },
    deleteBook: (state, action) => {
      state.listBook = state.listBook.filter(item => item.id != action.payload.id)
      localStorage.setItem('listBookStorage', JSON.stringify(state.listBook));
    },
    updateBook: (state, action) => {
      const index = state.listBook.findIndex(item => item.id === action.payload.id)

      state.listBook.splice(index, 1, {
        id: action.payload.id,
        title: action.payload.title,
        author: action.payload.author,
        year: action.payload.year
      })

      localStorage.setItem('listBookStorage', JSON.stringify(state.listBook));
    },
    setDetailBook: (state, action) => {
      const book = state.listBook.find(item => item.id === action.payload.id)
      state.detailBook = book || {};
    }
  }
})

export const { addBook, deleteBook, updateBook, setDetailBook } = bookSlice.actions

export default bookSlice.reducer