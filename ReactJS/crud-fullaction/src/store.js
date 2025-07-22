import { configureStore } from '@reduxjs/toolkit'
import brandReducer from './redux/slices/brand.slice'
import categoryReducer from './redux/slices/category.slice'
import productReducer from './redux/slices/product.slice'
import uiReducer from './redux/slices/ui.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    ui: uiReducer
  }
})