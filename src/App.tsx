import React, { Fragment, useEffect } from 'react';
import HeaderBar from './components/HeaderBar/HeaderBar';
import { Outlet } from 'react-router-dom';
import { Card } from 'flowbite-react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './store/reducers/productSlice';

function App() {
  // const allProductState = useSelector((state: any) => state.allProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      <Card className="m-8">
        <Outlet />
      </Card>
    </Fragment>
  );
}

export default App;
