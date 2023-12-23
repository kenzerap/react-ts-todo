import React, { Fragment, useEffect } from 'react';
import HeaderBar from './components/HeaderBar/HeaderBar';
import { Outlet } from 'react-router-dom';
import './App.css';
import ToastMessage from './components/ToastMessage/ToastMessage';
import { useDispatch } from 'react-redux';
import { setAuthState } from './store/reducers/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const userInfo = localStorage.getItem('userInfo');
    const user = userInfo ? JSON.parse(userInfo) : null;

    dispatch(setAuthState({ token, user }));
  }, []);

  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      <ToastMessage></ToastMessage>

      <div className="m-8">
        <Outlet />
      </div>
    </Fragment>
  );
}

export default App;
