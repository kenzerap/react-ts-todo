import productSagas from './products';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([...productSagas]);
}
