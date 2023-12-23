import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: () => {},
    getUsersSuccess: (
      state: UserState,
      action: PayloadAction<{ users: User[] }>
    ) => {
      state.users = action.payload.users;
    },
    getUsersFailed: () => {},

    resetUserState: (state: UserState) => {
      state.users = [];
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailed,

  resetUserState,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
