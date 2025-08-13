import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (params) => {
    const { id, data, callback } = params;
    const response = await api.put(`/users/${id}`, data);
    if (callback) callback();
    return response.data;
  }
);

export const updateUserRole = createAsyncThunk(
  'user/updateUserRole',
  async (params) => {
    const { id, role, callback } = params;
    const response = await api.patch(`/users/${id}/role`, { role });
    if (callback) callback();
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'user/addToCart',
  async (params) => {
    const { userId, productId, callback } = params;
    const response = await api.post('/users/cart', { userId, productId });
    if (callback) callback();
    return response.data;
  }
);

export const getCartItems = createAsyncThunk(
  'user/getCartItems',
  async (params = {}) => {
    const { userId, query, callback } = params;
    const response = await api.get(`/users/${userId}/cart`, { params: query });
    if (callback) callback();
    return response.data;
  }
);
