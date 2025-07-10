import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async () => {
    const response = await axios.get("http://localhost:3000/brands");
    return response.data;
  }
)

export const getBrand = createAsyncThunk(
  'brand/getBrand',
  async (params) => {
    const response = await axios.get(
      `http://localhost:3000/brands/${params.id}`
    )
    return response.data
  }
)

export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async (params) => {
    const response = await axios.post(
      'http://localhost:3000/brands',
      params.data
    )
    params.callback()
    return response.data
  }
)

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async (params) => {
    const response = await axios.patch(
      `http://localhost:3000/brands/${params.id}`,
      params.data
    )
    params.callback()
    return response.data
  }
)

export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async (params) => {
    const response = await axios.delete(
      `http://localhost:3000/brands/${params.id}`
    )
    params.callback()
    return response.data
  }
)