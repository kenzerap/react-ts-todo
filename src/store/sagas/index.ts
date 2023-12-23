import productSagas from './products';
import uiToastMessageSagas from './uiToastMessage';
import authSagas from './auth';
import userSagas from './user';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    ...productSagas,
    ...uiToastMessageSagas,
    ...authSagas,
    ...userSagas,
  ]);
}
