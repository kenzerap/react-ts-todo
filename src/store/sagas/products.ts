import { takeEvery, takeLatest, call, put, fork } from 'redux-saga/effects';
import * as productApiService from '../../services/product-api.service';
import { Product } from '../../models/product.model';
import * as productActions from '../reducers/productSlice';
import * as uiLoadingActions from '../reducers/uiLoadingSlice';
import * as uiToastMessageActions from '../reducers/uiToastMessageSlice';
import { AxiosResponse } from 'axios';
import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';

function* getProducts() {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: productActions.getProducts.type,
      })
    );

    const res: AxiosResponse<Product[]> = yield call(
      productApiService.getProducts
    );
    yield put(productActions.getProductsSuccess({ products: res.data }));
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

function* getProductById({ payload }: PayloadAction<{ productId: string }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: productActions.getProductById.type,
      })
    );

    const res: AxiosResponse<Product> = yield call(
      productApiService.getProductById,
      payload.productId
    );
    yield put(productActions.getProductByIdSuccess({ product: res.data }));
  } catch (error) {
    yield put(productActions.getProductsFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: productActions.getProductById.type,
      })
    );
  }
}

function* watchGetProductByIdRequest() {
  yield takeEvery<
    ActionCreatorWithPayload<
      {
        productId: string;
      },
      string
    >
  >(productActions.getProductById, getProductById);
}

function* createProduct({ payload }: PayloadAction<{ product: Product }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: productActions.createProduct.type,
      })
    );

    yield call(productApiService.createProduct, payload.product);

    yield put(
      uiToastMessageActions.setToastMessage({
        message: 'Create successfully',
        type: 'success',
      })
    );

    yield put(productActions.createProductSuccess());
  } catch (error: any) {
    yield put(
      uiToastMessageActions.setToastMessage({
        message: error,
        type: 'error',
      })
    );

    yield put(productActions.createProductFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: productActions.createProduct.type,
      })
    );
  }
}

function* watchCreateProductRequest() {
  yield takeLatest<
    ActionCreatorWithPayload<
      {
        product: Product;
      },
      string
    >
  >(productActions.createProduct, createProduct);
}

function* updateProduct({
  payload,
}: PayloadAction<{ productId: string; product: Product }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: productActions.updateProduct.type,
      })
    );

    yield call(
      productApiService.updateProduct,
      payload.productId,
      payload.product
    );

    yield put(
      uiToastMessageActions.setToastMessage({
        message: 'Update successfully',
        type: 'success',
      })
    );

    yield put(productActions.updateProductSuccess());
  } catch (error: any) {
    yield put(
      uiToastMessageActions.setToastMessage({
        message: error,
        type: 'error',
      })
    );

    yield put(productActions.updateProductFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: productActions.updateProduct.type,
      })
    );
  }
}

function* watchUpdateProductRequest() {
  yield takeLatest<
    ActionCreatorWithPayload<
      {
        productId: string;
        product: Product;
      },
      string
    >
  >(productActions.updateProduct, updateProduct);
}

function* deleteProduct({ payload }: PayloadAction<{ productId: string }>) {
  try {
    yield put(
      uiLoadingActions.startLoading({
        actionName: productActions.deleteProduct.type,
      })
    );

    yield call(productApiService.deleteProduct, payload.productId);

    yield put(
      uiToastMessageActions.setToastMessage({
        message: 'Delete successfully',
        type: 'success',
      })
    );

    yield put(productActions.deleteProductSuccess());

    yield put(productActions.getProducts());
  } catch (error: any) {
    yield put(
      uiToastMessageActions.setToastMessage({
        message: error,
        type: 'error',
      })
    );

    yield put(productActions.deleteProductFailed());
  } finally {
    yield put(
      uiLoadingActions.stopLoading({
        actionName: productActions.deleteProduct.type,
      })
    );
  }
}

function* watchDeleteProductRequest() {
  yield takeEvery<
    ActionCreatorWithPayload<
      {
        productId: string;
      },
      string
    >,
    any
  >(productActions.deleteProduct, deleteProduct);
}

const productSagas = [
  fork(watchGetProductsRequest),
  fork(watchDeleteProductRequest),
  fork(watchCreateProductRequest),
  fork(watchUpdateProductRequest),
  fork(watchGetProductByIdRequest)
];

export default productSagas;
