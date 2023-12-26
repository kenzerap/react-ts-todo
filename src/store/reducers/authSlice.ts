import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';

export interface AuthState {
  userInfo: User | null;
  token: string;
}

const initialState: AuthState = {
  userInfo: null,
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state: AuthState,
      action: PayloadAction<{ email: string; password: string }>
    ) => {},
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
    },
    loginFailed: () => {},
    signup: (
      state: AuthState,
      action: PayloadAction<{ userData: Partial<User> }>
    ) => {},
    signupSuccess: () => {},
    signupFailed: () => {},

    setAuthState: (
      state: AuthState,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state: AuthState) => {
      state.userInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailed,

  signup,
  signupSuccess,
  signupFailed,

  setAuthState,
  logout,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
