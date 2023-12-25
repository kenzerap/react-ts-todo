import React, { useEffect } from 'react';
import ProductCreateEditForm from '../../components/ProductCreateEditForm/ProductCreateEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../store/reducers/productSlice';
import * as fromReducer from '../../store/reducers';
import { Product } from '../../models/product.model';

const ProductCreatePage: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productDetail: Product | null = useSelector(fromReducer.selectProductDetail);

  useEffect(() => {
    dispatch(getProductById({ productId: productId || '' }));
  }, [dispatch, productId]);
  return <ProductCreateEditForm isCreate={false} data={productDetail}></ProductCreateEditForm>;
};

export default ProductCreatePage;
