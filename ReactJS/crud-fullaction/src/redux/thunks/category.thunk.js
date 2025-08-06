import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    const response = await api.get('/categories');
    return response.data;
  }
);

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (params) => {
    const response = await api.get(`/categories/${params.id}`);
    return response.data;
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (params) => {
    const response = await api.post('/categories', params.data);
    params.callback();
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (params) => {
    const response = await api.patch(`/categories/${params.id}`, params.data);
    params.callback();
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (params) => {
    const response = await api.delete(`/categories/${params.id}`);
    params.callback();
    return response.data;
  }
);
