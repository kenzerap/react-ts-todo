import React, { Fragment, useEffect, useState } from 'react';
import classes from './Products.module.css';
import { Button, Card, Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  resetProducts,
  deleteProduct,
} from '../../store/reducers/productSlice';
import * as fromReducer from '../../store/reducers';
import { Product } from '../../models/product.model';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { resetLoading } from '../../store/reducers/uiLoadingSlice';
import DeleteProductModal from '../../components/DeleteProductModal/DeleteProductModal';

const ProductsPage: React.FC<{}> = (props) => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [productIdDeleted, setProductIdDeleted] = useState('');

  const products: Product[] = useSelector(fromReducer.selectProducts);

  const productsLoading: boolean = useSelector(fromReducer.selectLoadings)[
    getProducts.type
  ];
  const deleting: boolean = useSelector(fromReducer.selectLoadings)[
    deleteProduct.type
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());

    return () => {
      dispatch(resetLoading());
      dispatch(resetProducts());
    };
  }, []);

  const navigateToCreate = () => {
    navigate('/product/create');
  };

  const deleteProductHandler = (productId: any) => {
    setIsShowDeleteModal(true);
    setProductIdDeleted(productId);
  };

  const closeConfirmModalHandeler = (isConfirm: boolean) => {
    if (isConfirm) {
      dispatch(deleteProduct({ productId: productIdDeleted }));
    }

    setIsShowDeleteModal(false);
  };

  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">Product list</div>
        <Button onClick={navigateToCreate}>Create</Button>
      </div>

      <Card className="overflow-x-auto">
        {productsLoading ? (
          <div className="text-center">
            <Spinner aria-label="loading" />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {(products || []).map((product) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={product.id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </Table.Cell>
                    <Table.Cell>{product.price}$</Table.Cell>
                    <Table.Cell>
                      <img
                        src={product.imageUrl}
                        alt={product.imageUrl}
                        className="max-w-60"
                      />
                    </Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/product/${product.id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </Link>
                      <Link
                        to={''}
                        onClick={() => deleteProductHandler(product.id)}
                        className={`font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-4 ${
                          deleting ? classes.disabled : ''
                        }`}
                      >
                        Delete
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </Card>

      <DeleteProductModal
        isShowDeleteModal={isShowDeleteModal}
        onCloseConfirmModal={closeConfirmModalHandeler}
      ></DeleteProductModal>
    </Fragment>
  );
};

export default ProductsPage;
