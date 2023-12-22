import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UiLoadingState {
  loadings: { [loadingName: string]: boolean };
}

const initialState: UiLoadingState = {
  loadings: {},
};

export const uiLoadingSlice = createSlice({
  name: 'uiLoading',
  initialState,
  reducers: {
    startLoading: (
      state: UiLoadingState,
      action: PayloadAction<{ actionName: string }>
    ) => {
      state.loadings[action.payload.actionName] = true;
    },
    stopLoading: (
      state: UiLoadingState,
      action: PayloadAction<{ actionName: string }>
    ) => {
      state.loadings[action.payload.actionName] = false;
    },
    resetLoading: (state: UiLoadingState) => {
      state.loadings = {};
    },
  },
});

export const { startLoading, stopLoading, resetLoading } =
  uiLoadingSlice.actions;

export const uiLoadingReducer = uiLoadingSlice.reducer;
