import React, { Fragment } from 'react';
import HeaderBar from './components/HeaderBar/HeaderBar';
import { Outlet } from 'react-router-dom';
import './App.css';
import ToastMessage from './components/ToastMessage/ToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/reducers';

function App() {
  const isShowMessage: boolean = useSelector((state: RootState) => {
    return state.uiToastMessage.isShow;
  });
  const message: string = useSelector((state: RootState) => {
    return state.uiToastMessage.message;
  });
  const messageType: string = useSelector((state: RootState) => {
    return state.uiToastMessage.type;
  });

  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      {isShowMessage && (
        <ToastMessage message={message} type={messageType}></ToastMessage>
      )}

      <div className="m-8">
        <Outlet />
      </div>
    </Fragment>
  );
}

export default App;
