import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Provider } from 'react-redux';
import { store } from './store/reducers';
import axios, { AxiosError } from 'axios';
import LoginPage from './pages/Login/Login';
import { checkAuthLoader } from './utils/checkAuth';
import SignUpPage from './pages/SignUp/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '',
        async lazy(): Promise<any> {
          let HomePage = (await import('./pages/Home/Home')).default;
          return { Component: HomePage };
        },
      },
      {
        path: 'product',
        async lazy(): Promise<any> {
          let ProductsPage = (await import('./pages/Products/Products'))
            .default;
          return { Component: ProductsPage };
        },
      },
      {
        path: 'product/create',
        async lazy(): Promise<any> {
          let ProductCreatePage = (
            await import('./pages/ProductCreate/ProductCreate')
          ).default;
          return { Component: ProductCreatePage };
        },
      },
      {
        path: 'product/:productId',
        async lazy(): Promise<any> {
          let ProductEditPage = (
            await import('./pages/ProductEdit/ProductEdit')
          ).default;
          return { Component: ProductEditPage };
        },
      },
      {
        path: 'user',
        async lazy(): Promise<any> {
          let UsersPage = (await import('./pages/Users/Users')).default;
          return { Component: UsersPage };
        },
        loader: checkAuthLoader,
      },
      {
        path: 'user/:userId',

        async lazy(): Promise<any> {
          let UserDetailPage = (await import('./pages/UserDetail/UserDetail'))
            .default;
          return { Component: UserDetailPage };
        },
        loader: checkAuthLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignUpPage></SignUpPage>,
  },
]);

axios.defaults.baseURL = process.env.API_URL || 'https://nodejs-todo-9emm.onrender.com';
axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';

  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bear ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }

    throw error.response?.data;
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
