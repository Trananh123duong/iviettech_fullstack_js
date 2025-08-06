import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getBrands = createAsyncThunk(
  'brand/getBrands',
  async () => {
    const response = await api.get('/brands');
    return response.data;
  }
);

export const getBrand = createAsyncThunk(
  'brand/getBrand',
  async (params) => {
    const response = await api.get(`/brands/${params.id}`);
    return response.data;
  }
);

export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async (params) => {
    const response = await api.post('/brands', params.data);
    params.callback();
    return response.data;
  }
);

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async (params) => {
    const response = await api.patch(`/brands/${params.id}`, params.data);
    params.callback();
    return response.data;
  }
);

export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async (params) => {
    const response = await api.delete(`/brands/${params.id}`);
    params.callback();
    return response.data;
  }
);
