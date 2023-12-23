import {
  put,
  fork,
  takeLatest,
  call,
} from 'redux-saga/effects';
import * as authActions from '../reducers/authSlice';
import * as uiLoadingActions from '../reducers/uiLoadingSlice';
import * as uiToastMessageActions from '../reducers/uiToastMessageSlice';
import * as authApiService from '../../services/auth-api.service';
import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';
import { AxiosResponse } from 'axios';

function* login({
  payload,
}: PayloadAction<{ email: string; password: string }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: authActions.login.type,
      })
    );

    const res: AxiosResponse<{ token: string; user: User }> = yield call(
      authApiService.login,
      {
        email: payload.email,
        password: payload.password,
      }
    );

    yield put(
      authActions.loginSuccess({ user: res.data.user, token: res.data.token })
    );
  } catch (error: any) {
    yield put(
      uiToastMessageActions.setToastMessage({
        message: error,
        type: 'error',
      })
    );

    yield put(authActions.loginFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: authActions.login.type,
      })
    );
  }
}

function* watchLoginRequest() {
  yield takeLatest<
    ActionCreatorWithPayload<{ email: string; password: string }, string>
  >(authActions.login, login);
}

function* signup({ payload }: PayloadAction<{ userData: Partial<User> }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: authActions.signup.type,
      })
    );

    yield call(authApiService.signup, payload.userData);

    yield put(
      uiToastMessageActions.setToastMessage({
        message: 'Sign up successfully',
        type: 'success',
      })
    );

    yield put(authActions.signupSuccess());
  } catch (error) {
    yield put(
      uiToastMessageActions.setToastMessage({
        message: error,
        type: 'error',
      })
    );

    yield put(authActions.signupSuccess());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: authActions.signup.type,
      })
    );
  }
}

function* watchSignupRequest() {
  yield takeLatest<
    ActionCreatorWithPayload<{ userData: Partial<User> }, string>
  >(authActions.signup, signup);
}

const authSagas = [fork(watchLoginRequest), fork(watchSignupRequest)];

export default authSagas;
