import { createSlice } from '@reduxjs/toolkit';
import { addToCart, getUsers, updateUser, updateUserRole } from '../thunks/user.thunk';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    listUser: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    updateUserData: {
      status: 'idle',
      error: null,
    },
    updateUserRoleData: {
      status: 'idle',
      error: null,
    },
    addToCartData: {
      status: 'idle',
      error: null,
      item: null,
    },
  },
  reducers: {
    resetUserStatus: (state) => {
      state.updateUserData = { status: 'idle', error: null };
      state.updateUserRoleData = { status: 'idle', error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.listUser.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const { data, meta, more } = action.payload;
        state.listUser.status = 'succeeded';
        state.listUser.data = more
          ? [...state.listUser.data, ...data]
          : data;
        state.listUser.meta = meta;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.listUser.status = 'failed';
        state.listUser.error = action.error.message;
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.updateUserData.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserData.status = 'succeeded';
        const updated = action.payload.user;
        const idx = state.listUser.data.findIndex((u) => u.id === updated.id);
        if (idx !== -1) {
          state.listUser.data[idx] = { ...state.listUser.data[idx], ...updated };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserData.status = 'failed';
        state.updateUserData.error = action.error.message;
      })

      // updateUserRole
      .addCase(updateUserRole.pending, (state) => {
        state.updateUserRoleData.status = 'loading';
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.updateUserRoleData.status = 'succeeded';
        const updated = action.payload.user;
        const idx = state.listUser.data.findIndex((u) => u.id === updated.id);
        if (idx !== -1) {
          state.listUser.data[idx] = { ...state.listUser.data[idx], ...updated };
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.updateUserRoleData.status = 'failed';
        state.updateUserRoleData.error = action.error.message;
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.addToCartData.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addToCartData.status = 'succeeded';
        state.addToCartData.item = action.payload.item;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addToCartData.status = 'failed';
        state.addToCartData.error = action.error.message;
      });
  },
});

export const { resetUserStatus } = userSlice.actions;
export default userSlice.reducer;
