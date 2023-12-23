import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UiToastMessageState {
  message: string;
  type: 'success' | 'error' | '';
  isShow: boolean;
}

const initialState: UiToastMessageState = {
  message: '',
  type: '',
  isShow: false,
};

export const uiToastMessageSlice = createSlice({
  name: 'uiToastMessage',
  initialState,
  reducers: {
    setToastMessage: (
      state: UiToastMessageState,
      action: PayloadAction<{ message: any; type: 'success' | 'error' | '' }>
    ) => {
      state.message = action.payload.message.message
        ? action.payload.message.message
        : JSON.stringify(action.payload.message);
      state.type = action.payload.type;
      state.isShow = true;
    },
    clearToastMessage: (state: UiToastMessageState) => {
      state.message = '';
      state.type = '';
      state.isShow = false;
    },
  },
});

export const { setToastMessage, clearToastMessage } =
  uiToastMessageSlice.actions;

export const uiToastMessageReducer = uiToastMessageSlice.reducer;
