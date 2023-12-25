import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';

export interface UserState {
  users: User[];
  userDetail: User | null;
}

const initialState: UserState = {
  users: [],
  userDetail: null,
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

    getUserById: (
      state: UserState,
      action: PayloadAction<{ userId: string }>
    ) => {},
    getUserByIdSuccess: (
      state: UserState,
      action: PayloadAction<{ user: User }>
    ) => {
      state.userDetail = action.payload.user;
    },
    getUserByIdFailed: () => {},

    updateUser: (
      state: UserState,
      action: PayloadAction<{ userId: string; user: User }>
    ) => {},
    updateUserSuccess: (
      state: UserState,
      action: PayloadAction<{ user: User }>
    ) => {
      state.userDetail = action.payload.user;
    },
    updateUserFailed: () => {},

    deleteUser: (
      state: UserState,
      action: PayloadAction<{ userId: string }>
    ) => {},
    deleteUserSuccess: (
      state: UserState,
      action: PayloadAction<{ message: string }>
    ) => {},
    deleteUserFailed: () => {},

    resetUserState: (state: UserState) => {
      state.users = [];
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailed,

  getUserById,
  getUserByIdSuccess,
  getUserByIdFailed,

  updateUser,
  updateUserSuccess,
  updateUserFailed,

  deleteUser,
  deleteUserSuccess,
  deleteUserFailed,

  resetUserState,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
