import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const response = await axios.get("http://localhost:3000/api/categories");
    return response.data;
  }
)

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (params) => {
    const response = await axios.get(
      `http://localhost:3000/api/categories/${params.id}`
    )
    return response.data
  }
)

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (params) => {
    const response = await axios.post(
      'http://localhost:3000/api/categories',
      params.data
    )
    params.callback()
    return response.data
  }
)

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (params) => {
    const response = await axios.patch(
      `http://localhost:3000/api/categories/${params.id}`,
      params.data
    )
    params.callback()
    return response.data
  }
)

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (params) => {
    const response = await axios.delete(
      `http://localhost:3000/api/categories/${params.id}`
    )
    params.callback()
    return response.data
  }
)