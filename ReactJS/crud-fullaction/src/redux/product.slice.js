import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    listProduct: localStorage.getItem('listProductStorage') ? JSON.parse(localStorage.getItem('listProductStorage')) : [],
    detailProduct: {}
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: uuidv4(),
        name: action.payload.name,
        price: action.payload.price
      };
      state.listProduct.unshift(newProduct)

      localStorage.setItem('listProductStorage', JSON.stringify(state.listProduct));
    },
    deleteProduct: (state, action) => {
      state.listProduct = state.listProduct.filter(item => item.id != action.payload.id)
      localStorage.setItem('listProductStorage', JSON.stringify(state.listProduct));
    },
    updateProduct: (state, action) => {
      const index = state.listProduct.findIndex(item => item.id === action.payload.id)

      state.listProduct.splice(index, 1, {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price
      })

      localStorage.setItem('listProductStorage', JSON.stringify(state.listProduct));
    },
    setDetailProduct: (state, action) => {
      const product = state.listProduct.find(item => item.id === action.payload.id)
      state.detailProduct = product || {};
    }
  }
})

export const { addProduct, deleteProduct, updateProduct, setDetailProduct } = productSlice.actions

export default productSlice.reducer