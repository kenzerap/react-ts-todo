import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './productSlice';
import { uiLoadingReducer } from './uiLoadingSlice';
import { authReducer } from './authSlice';
import { userReducer } from './userSlice';
import { cartShoppingReducer } from './cartShoppingSlice';
import { uiToastMessageReducer } from './uiToastMessageSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware: any = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    product: productReducer,
    uiLoading: uiLoadingReducer,
    uiToastMessage: uiToastMessageReducer,
    auth: authReducer,
    user: userReducer,
    cartShopping: cartShoppingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// product selectors
export const selectProducts = (state: RootState) => state.product.products;
export const selectProductDetail = (state: RootState) =>
  state.product.productDetail;

// loading selectors
export const selectLoadings = (state: RootState) => state.uiLoading.loadings;

// uiToastMessage selectors
export const selectIsShowMessage = (state: RootState) =>
  state.uiToastMessage.isShow;
export const selectMessage = (state: RootState) => state.uiToastMessage.message;
export const selectMessageType = (state: RootState) =>
  state.uiToastMessage.type;

// users selectors
export const selectUsers = (state: RootState) => state.user.users;
export const selectUserDetail = (state: RootState) => state.user.userDetail;

// auth selectors
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;
export const selectIsAdmin = (state: RootState) =>
  !!state.auth.userInfo?.isAdmin;
export const selectIsLogin = (state: RootState) => !!state.auth.userInfo;

// cartShopping selectors
export const selectCartItemCount = (state: RootState) =>
  state.cartShopping.itemCount;
export const selectCartitems = (state: RootState) => state.cartShopping.items;
