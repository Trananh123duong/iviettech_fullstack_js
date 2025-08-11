import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slices/auth.slice'
import brandReducer from './redux/slices/brand.slice'
import categoryReducer from './redux/slices/category.slice'
import productReducer from './redux/slices/product.slice'
import uiReducer from './redux/slices/ui.slice'
import userReducer from './redux/slices/user.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    ui: uiReducer,
    auth: authReducer,
    user: userReducer
  }
})