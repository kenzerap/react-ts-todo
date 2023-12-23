import {
  takeEvery,
  put,
  fork,
  call,
} from 'redux-saga/effects';
import * as userActions from '../reducers/userSlice';
import * as uiLoadingActions from '../reducers/uiLoadingSlice';
import * as userApiService from '../../services/user-api.service';
import { User } from '../../models/user.model';
import { AxiosResponse } from 'axios';

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

const userSagas = [fork(watchGetUsersRequest)];

export default userSagas;
