import React from 'react';
import classes from './ProductEdit.module.css';
import ProductCreateEditForm from '../../components/ProductCreateEditForm/ProductCreateEditForm';

const ProductEditPage: React.FC<{}> = () => {
  return <ProductCreateEditForm isCreate={true} data={null}></ProductCreateEditForm>;
};

export default ProductEditPage;
