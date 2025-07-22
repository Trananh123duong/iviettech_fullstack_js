import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from '../thunks/category.thunk';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    listCategory: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    detailCategory: {
      data: {},
      status: 'idle',
      error: null,
    },
    createCategoryData: {
      status: 'idle',
      error: null,
    },
    updateCategoryData: {
      status: 'idle',
      error: null,
    },
    deleteCategoryData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    // addCategory: (state, action) => {
    //   const newCategory = {
    //     id: uuidv4(),
    //     name: action.payload.name,
    //     price: action.payload.price
    //   };
    //   state.listCategory.unshift(newCategory)

    //   localStorage.setItem('listCategoryStorage', JSON.stringify(state.listCategory));
    // },
    // deleteCategory: (state, action) => {
    //   state.listCategory = state.listCategory.filter(item => item.id != action.payload.id)
    //   localStorage.setItem('listCategoryStorage', JSON.stringify(state.listCategory));
    // },
    // updateCategory: (state, action) => {
    //   const index = state.listCategory.findIndex(item => item.id === action.payload.id)

    //   state.listCategory.splice(index, 1, {
    //     id: action.payload.id,
    //     name: action.payload.name,
    //     price: action.payload.price
    //   })

    //   localStorage.setItem('listCategoryStorage', JSON.stringify(state.listCategory));
    // },
    // setDetailCategory: (state, action) => {
    //   const category = state.listCategory.find(item => item.id === action.payload.id)
    //   state.detailCategory = category || {};
    // }
  },
  extraReducers: (builder) => {
    builder
      //list category
      .addCase(getCategories.pending, (state) => {
        state.listCategory.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.listCategory.status = 'succeeded';
        state.listCategory.data = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.listCategory.status = 'failed';
        state.listCategory.error = action.error.message;
      })
      // getCategory
      .addCase(getCategory.pending, (state) => {
        state.detailCategory.status = 'loading'
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.detailCategory.status = 'succeeded'
        state.detailCategory.data = action.payload.data
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.detailCategory.status = 'failed'
        state.detailCategory.error = action.error.message
      })
      // createCategory
      .addCase(createCategory.pending, (state) => {
        state.createCategoryData.status = 'loading'
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.createCategoryData.status = 'succeeded'
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.createCategoryData.status = 'failed'
        state.createCategoryData.error = action.error.message
      })
      // updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.updateCategoryData.status = 'loading'
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.updateCategoryData.status = 'succeeded'
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updateCategoryData.status = 'failed'
        state.updateCategoryData.error = action.error.message
      })
      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategoryData.status = 'loading'
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteCategoryData.status = 'succeeded'
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteCategoryData.status = 'failed'
        state.deleteCategoryData.error = action.error.message
      })
  }
})

// export const { addCategory, updateCategory, setDetailCategory } = categorySlice.actions

export default categorySlice.reducer