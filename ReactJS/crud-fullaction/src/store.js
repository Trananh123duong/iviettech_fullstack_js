import { configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/product.slice'

export default configureStore({
  reducer: {
    product: productReducer
  }
})