import React, { Fragment, useEffect } from 'react';
import classes from './ProductCreate.module.css';
import ProductCreateEditForm from '../../components/ProductCreateEditForm/ProductCreateEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../store/reducers/productSlice';
import { RootState } from '../../store/reducers';
import { Product } from '../../models/product.model';

const ProductCreatePage: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productDetail: Product | null = useSelector((state: RootState) => {
    return state.product.productDetail;
  });

  useEffect(() => {
    console.log(productId);
    dispatch(getProductById({ productId: productId || '' }));
  }, []);
  return <ProductCreateEditForm isCreate={false} data={productDetail}></ProductCreateEditForm>;
};

export default ProductCreatePage;
