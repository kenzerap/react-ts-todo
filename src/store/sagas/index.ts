import productSagas from './products';
import uiToastMessageSagas from './uiToastMessage';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([...productSagas, ...uiToastMessageSagas]);
}
