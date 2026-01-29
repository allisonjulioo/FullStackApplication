import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductState } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4040';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data as Product[];
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (product: Omit<Product, 'id'>) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data as Product;
  },
);

const initialState: ProductState = {
  products: [],
  loading: false,
  modalOpen: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.modalOpen = false;
      });
  },
});

export const { toggleModal } = productSlice.actions;
export default productSlice.reducer;
