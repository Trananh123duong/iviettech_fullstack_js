import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: localStorage.getItem('listProductStorage') ? JSON.parse(localStorage.getItem('listProductStorage')) : []
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: uuidv4(),
        name: action.payload.name,
        price: action.payload.price
      };
      state.productList.unshift(newProduct)

      localStorage.setItem('listProductStorage', JSON.stringify(state.productList));
    },
  }
})

export const { addProduct } = productSlice.actions

export default productSlice.reducer