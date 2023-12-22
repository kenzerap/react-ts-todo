import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './productSlice';
import { uiLoadingReducer } from './uiLoadingSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware: any = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    product: productReducer,
    uiLoading: uiLoadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// selectors
export const selectProducts = (state: RootState) => state.product.products;
