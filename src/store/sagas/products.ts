import { takeEvery, takeLatest, call, put, fork } from 'redux-saga/effects';
// import * as uiLoadingActions from '../actions/uiLoading';
// import * as actions from '../actions/products';
import * as productApiService from '../../services/product-api.service';
import { Product } from '../../models/product.model';
import * as productActions from '../reducers/productSlice';
import * as uiLoadingActions from '../reducers/uiLoadingSlice';

function* getProducts() {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: productActions.getProducts.type,
      })
    );

    const products: Product[] = yield call(productApiService.getProducts);
    yield put(productActions.getProductsSuccess({ products }));
  } catch (error) {
    yield put(productActions.getProductsFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: productActions.getProducts.type,
      })
    );
  }
}

function* watchGetProductsRequest() {
  yield takeEvery(productActions.getProducts, getProducts);
}

/* function* getProducts() {
  try {
    yield put(
      uiLoadingActions.startLoading({ actionName: actions.Types.GET_PRODUCTS })
    );

    const products: Product[] = yield call(productService.getProducts);
    yield put(actions.getProductsSuccess({ products }));
  } catch (error) {
    yield put(actions.getProductsFailed({ error }));
  } finally {
    yield put(
      uiLoadingActions.stopLoading({ actionName: actions.Types.GET_PRODUCTS })
    );
  }
}

function* watchGetProductsRequest() {
  yield takeEvery(actions.Types.GET_PRODUCTS, getProducts);
}

function* createProduct({ product }: any) {
  try {
    console.log('product: ', product);
    yield put(
      uiLoadingActions.startLoading({
        actionName: actions.Types.CREATE_PRODUCT,
      })
    );

    yield call(productService.createProduct, product);

    yield put(actions.createProductSuccess());
  } catch (error) {
    yield put(actions.createProductFailed({ error }));
  } finally {
    yield put(
      uiLoadingActions.stopLoading({ actionName: actions.Types.CREATE_PRODUCT })
    );
  }
}

function* watchCreateProductRequest() {
  yield takeLatest(actions.Types.CREATE_PRODUCT, createProduct);
} */

const productSagas = [
  fork(watchGetProductsRequest),
  // fork(watchCreateProductRequest),
];

export default productSagas;
