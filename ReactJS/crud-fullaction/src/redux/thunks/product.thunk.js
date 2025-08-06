import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async () => {
    const response = await api.get('/products'); // KHÔNG cần base URL
    return response.data;
  }
);

export const getProductList = createAsyncThunk(
  'product/getProductList',
  async (params) => {
    const response = await api.get('/products/list', { params });
    return response.data;
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (params) => {
    const response = await api.get(`/products/${params.id}`);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (params) => {
    const response = await api.post('/products', params.data);
    params.callback();
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (params) => {
    const response = await api.patch(`/products/${params.id}`, params.data);
    params.callback();
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (params) => {
    const response = await api.delete(`/products/${params.id}`);
    params.callback();
    return response.data;
  }
);
