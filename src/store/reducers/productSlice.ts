import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product.model';

export interface ProductsState {
  products: Product[];
  productDetail: Product | null;
}

const initialState: ProductsState = {
  products: [],
  productDetail: null,
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

    getProductById: (
      state: ProductsState,
      action: PayloadAction<{ productId: string }>
    ) => {},
    getProductByIdSuccess: (
      state: ProductsState,
      action: PayloadAction<{ product: Product }>
    ) => {
      state.productDetail = action.payload.product;
    },
    getProductByIdFailed: () => {},

    createProduct: (
      state: ProductsState,
      action: PayloadAction<{ product: Product }>
    ) => {},
    createProductSuccess: () => {},
    createProductFailed: () => {},

    updateProduct: (
      state: ProductsState,
      action: PayloadAction<{ productId: string; product: Product }>
    ) => {},
    updateProductSuccess: () => {},
    updateProductFailed: () => {},

    deleteProduct: (
      _state: ProductsState,
      _action: PayloadAction<{ productId: string }>
    ) => {},
    deleteProductSuccess: () => {},
    deleteProductFailed: () => {},

    resetProducts: (state: ProductsState) => {
      state.products = [];
    },
  },
});

export const {
  getProducts,
  getProductsSuccess,
  getProductsFailed,

  getProductById,
  getProductByIdSuccess,
  getProductByIdFailed,

  createProduct,
  createProductSuccess,
  createProductFailed,

  updateProduct,
  updateProductSuccess,
  updateProductFailed,

  deleteProduct,
  deleteProductSuccess,
  deleteProductFailed,

  resetProducts,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
