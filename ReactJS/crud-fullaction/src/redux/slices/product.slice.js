import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from '../thunks/product.thunk';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    listProduct: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    detailProduct: {
      data: {},
      status: 'idle',
      error: null,
    },
    createProductData: {
      status: 'idle',
      error: null,
    },
    updateProductData: {
      status: 'idle',
      error: null,
    },
    deleteProductData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    // addProduct: (state, action) => {
    //   const newProduct = {
    //     id: uuidv4(),
    //     name: action.payload.name,
    //     price: action.payload.price
    //   };
    //   state.listProduct.unshift(newProduct)

    //   localStorage.setItem('listProductStorage', JSON.stringify(state.listProduct));
    // },
    // deleteProduct: (state, action) => {
    //   state.listProduct = state.listProduct.filter(item => item.id != action.payload.id)
    //   localStorage.setItem('listProductStorage', JSON.stringify(state.listProduct));
    // },
    // updateProduct: (state, action) => {
    //   const index = state.listProduct.findIndex(item => item.id === action.payload.id)

    //   state.listProduct.splice(index, 1, {
    //     id: action.payload.id,
    //     name: action.payload.name,
    //     price: action.payload.price
    //   })

    //   localStorage.setItem('listProductStorage', JSON.stringify(state.listProduct));
    // },
    // setDetailProduct: (state, action) => {
    //   const product = state.listProduct.find(item => item.id === action.payload.id)
    //   state.detailProduct = product || {};
    // }
  },
  extraReducers: (builder) => {
    builder
      //list product
      .addCase(getProducts.pending, (state) => {
        state.listProduct.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.listProduct.status = 'succeeded';
        state.listProduct.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.listProduct.status = 'failed';
        state.listProduct.error = action.error.message;
      })
      // getProduct
      .addCase(getProduct.pending, (state) => {
        state.detailProduct.status = 'loading'
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.detailProduct.status = 'succeeded'
        state.detailProduct.data = action.payload.data
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.detailProduct.status = 'failed'
        state.detailProduct.error = action.error.message
      })
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.createProductData.status = 'loading'
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createProductData.status = 'succeeded'
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductData.status = 'failed'
        state.createProductData.error = action.error.message
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.updateProductData.status = 'loading'
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateProductData.status = 'succeeded'
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductData.status = 'failed'
        state.updateProductData.error = action.error.message
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductData.status = 'loading'
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProductData.status = 'succeeded'
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductData.status = 'failed'
        state.deleteProductData.error = action.error.message
      })
  }
})

// export const { addProduct, updateProduct, setDetailProduct } = productSlice.actions

export default productSlice.reducer