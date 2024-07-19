import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'react-native-axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  });
  
  const productsSlice = createSlice({
    name: 'products',
    initialState: {
      items: [],
      cart: [],
      status: 'idle',
      error: null,
    },
    reducers: {
      addToCart: (state, action) => {
        state.cart.push(action.payload);
      },
      clearCart:(state, action) => {
        state.items = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export const { addToCart } = productsSlice.actions;
  export default productsSlice.reducer;