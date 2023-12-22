import { takeEvery, put, fork, delay } from 'redux-saga/effects';
import * as uiToastMessageActions from '../reducers/uiToastMessageSlice';
import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';

function* setToastMessage({
  payload,
}: PayloadAction<{ message: string; type: 'success' | 'error' | '' }>) {
  try {
    yield delay(3000);
    yield put(uiToastMessageActions.clearToastMessage());
  } catch (error) {
    console.log('setToastMessage err: ', error);
  }
}

function* watchSetToastMessageRequest() {
  yield takeEvery<
    ActionCreatorWithPayload<
      {
        message: string;
        type: '' | 'success' | 'error';
      },
      string
    >,
    any
  >(uiToastMessageActions.setToastMessage, setToastMessage);
}

const uiToastMessageSagas = [fork(watchSetToastMessageRequest)];

export default uiToastMessageSagas;
