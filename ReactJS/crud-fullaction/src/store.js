import { configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/product.slice'
import uiReducer from './redux/ui.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    ui: uiReducer
  }
})