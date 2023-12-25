import { takeEvery, put, fork, call } from 'redux-saga/effects';
import * as userActions from '../reducers/userSlice';
import * as uiLoadingActions from '../reducers/uiLoadingSlice';
import * as userApiService from '../../services/user-api.service';
import { User } from '../../models/user.model';
import { AxiosResponse } from 'axios';
import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import * as uiToastMessageActions from '../reducers/uiToastMessageSlice';

function* getUsers() {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: userActions.getUsers.type,
      })
    );

    const res: AxiosResponse<User[]> = yield call(userApiService.getUsers);
    yield put(userActions.getUsersSuccess({ users: res.data }));
  } catch (error) {
    yield put(userActions.getUsersFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: userActions.getUsers.type,
      })
    );
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(userActions.getUsers, getUsers);
}

function* getUserById({ payload }: PayloadAction<{ userId: string }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: userActions.getUserById.type,
      })
    );

    const res: AxiosResponse<User> = yield call(
      userApiService.getUserById,
      payload.userId
    );
    yield put(userActions.getUserByIdSuccess({ user: res.data }));
  } catch (error) {
    yield put(userActions.getUserByIdFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: userActions.getUserById.type,
      })
    );
  }
}

function* watchGetUserByIdRequest() {
  yield takeEvery<
    ActionCreatorWithPayload<
      {
        userId: string;
      },
      string
    >
  >(userActions.getUserById, getUserById);
}

function* updateUser({
  payload,
}: PayloadAction<{ userId: string; user: User }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: userActions.updateUser.type,
      })
    );

    const res: AxiosResponse<any> = yield call(
      userApiService.updateUser,
      payload.userId,
      payload.user
    );

    yield put(
      uiToastMessageActions.setToastMessage({
        message: 'Update successfully',
        type: 'success',
      })
    );

    yield put(userActions.getUserByIdSuccess({ user: res.data }));
  } catch (error) {
    yield put(
      uiToastMessageActions.setToastMessage({
        message: error,
        type: 'error',
      })
    );

    yield put(userActions.getUserByIdFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: userActions.updateUser.type,
      })
    );
  }
}

function* watchUpdateUserRequest() {
  yield takeEvery<
    ActionCreatorWithPayload<
      {
        userId: string;
        user: User;
      },
      string
    >
  >(userActions.updateUser, updateUser);
}

function* deleteUser({ payload }: PayloadAction<{ userId: string }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: userActions.deleteUser.type,
      })
    );

    const res: AxiosResponse<any> = yield call(
      userApiService.deleteUser,
      payload.userId
    );

    yield put(
      uiToastMessageActions.setToastMessage({
        message: 'Delete successfully',
        type: 'success',
      })
    );

    yield put(userActions.getUsersSuccess({ users: res.data }));

    yield put(userActions.getUsers());
  } catch (error) {
    yield put(
      uiToastMessageActions.setToastMessage({
        message: error,
        type: 'error',
      })
    );

    yield put(userActions.getUsersFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: userActions.deleteUser.type,
      })
    );
  }
}

function* watchDeleteUsersRequest() {
  yield takeEvery<
    ActionCreatorWithPayload<
      {
        userId: string;
      },
      string
    >
  >(userActions.deleteUser, deleteUser);
}

const userSagas = [
  fork(watchGetUsersRequest),
  fork(watchDeleteUsersRequest),
  fork(watchGetUserByIdRequest),
  fork(watchUpdateUserRequest),
];

export default userSagas;
