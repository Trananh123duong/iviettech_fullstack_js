import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './redux/book.slice'

export default configureStore({
  reducer: {
    book: bookReducer
  }
})