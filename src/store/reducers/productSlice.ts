import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product.model';

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: () => {},
    getProductsSuccess: (
      state: ProductsState,
      action: PayloadAction<{ products: Product[] }>
    ) => {
      state.products = action.payload.products;
    },
    getProductsFailed: () => {},
    resetProducts: (state: ProductsState) => {
      state = initialState;
    },
  },
});

export const {
  getProducts,
  getProductsSuccess,
  getProductsFailed,
  resetProducts,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
