import { configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/slices/product.slice'
import uiReducer from './redux/slices/ui.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    ui: uiReducer
  }
})