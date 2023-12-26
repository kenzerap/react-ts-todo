import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product.model';

export interface CartState {
  itemCount: number;
  items: Product[];
}

const initialState: CartState = {
  itemCount: 0,
  items: [],
};

export const cartShoppingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<{ item: Product }>) => {
      state.items.push(action.payload.item);
      state.itemCount = state.items.length;
    },
    removeFromCart: (
      state: CartState,
      action: PayloadAction<{ productId: string }>
    ) => {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.productId
      );
      state.items = newItems;
      state.itemCount = newItems.length;
    },
    resetCartShopping: (state: CartState) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCartShopping } =
  cartShoppingSlice.actions;

export const cartShoppingReducer = cartShoppingSlice.reducer;
