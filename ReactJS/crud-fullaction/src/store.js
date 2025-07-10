import { configureStore } from '@reduxjs/toolkit'
import brandReducer from './redux/slices/brand.slice'
import productReducer from './redux/slices/product.slice'
import uiReducer from './redux/slices/ui.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    brand: brandReducer,
    ui: uiReducer
  }
})