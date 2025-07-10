import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand
} from '../thunks/brand.thunk';

export const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    listBrand: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    detailBrand: {
      data: {},
      status: 'idle',
      error: null,
    },
    createBrandData: {
      status: 'idle',
      error: null,
    },
    updateBrandData: {
      status: 'idle',
      error: null,
    },
    deleteBrandData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    // addBrand: (state, action) => {
    //   const newBrand = {
    //     id: uuidv4(),
    //     name: action.payload.name,
    //     price: action.payload.price
    //   };
    //   state.listBrand.unshift(newBrand)

    //   localStorage.setItem('listBrandStorage', JSON.stringify(state.listBrand));
    // },
    // deleteBrand: (state, action) => {
    //   state.listBrand = state.listBrand.filter(item => item.id != action.payload.id)
    //   localStorage.setItem('listBrandStorage', JSON.stringify(state.listBrand));
    // },
    // updateBrand: (state, action) => {
    //   const index = state.listBrand.findIndex(item => item.id === action.payload.id)

    //   state.listBrand.splice(index, 1, {
    //     id: action.payload.id,
    //     name: action.payload.name,
    //     price: action.payload.price
    //   })

    //   localStorage.setItem('listBrandStorage', JSON.stringify(state.listBrand));
    // },
    // setDetailBrand: (state, action) => {
    //   const brand = state.listBrand.find(item => item.id === action.payload.id)
    //   state.detailBrand = brand || {};
    // }
  },
  extraReducers: (builder) => {
    builder
      //list brand
      .addCase(getBrands.pending, (state) => {
        state.listBrand.status = 'loading';
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.listBrand.status = 'succeeded';
        state.listBrand.data = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.listBrand.status = 'failed';
        state.listBrand.error = action.error.message;
      })
      // getBrand
      .addCase(getBrand.pending, (state) => {
        state.detailBrand.status = 'loading'
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.detailBrand.status = 'succeeded'
        state.detailBrand.data = action.payload
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.detailBrand.status = 'failed'
        state.detailBrand.error = action.error.message
      })
      // createBrand
      .addCase(createBrand.pending, (state) => {
        state.createBrandData.status = 'loading'
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.createBrandData.status = 'succeeded'
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.createBrandData.status = 'failed'
        state.createBrandData.error = action.error.message
      })
      // updateBrand
      .addCase(updateBrand.pending, (state) => {
        state.updateBrandData.status = 'loading'
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.updateBrandData.status = 'succeeded'
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.updateBrandData.status = 'failed'
        state.updateBrandData.error = action.error.message
      })
      // deleteBrand
      .addCase(deleteBrand.pending, (state) => {
        state.deleteBrandData.status = 'loading'
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.deleteBrandData.status = 'succeeded'
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.deleteBrandData.status = 'failed'
        state.deleteBrandData.error = action.error.message
      })
  }
})

// export const { addBrand, updateBrand, setDetailBrand } = brandSlice.actions

export default brandSlice.reducer