import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const API_URL = "http://localhost:3001/products";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts", async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);