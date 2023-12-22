import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
import classes from './ProductCreateEditForm.module.css';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  resetProducts,
  updateProduct,
} from '../../store/reducers/productSlice';
import { RootState } from '../../store/reducers';
import { resetLoading } from '../../store/reducers/uiLoadingSlice';
import { Product } from '../../models/product.model';

const ProductCreateEditForm: React.FC<{
  isCreate: boolean;
  data: Product | null;
}> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<Product>>({
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
  });

  const isCreating: boolean = useSelector((state: RootState) => {
    return state.uiLoading.loadings[createProduct.type];
  });

  const isUpdating: boolean = useSelector((state: RootState) => {
    return state.uiLoading.loadings[updateProduct.type];
  });

  useEffect(() => {
    return () => {
      dispatch(resetLoading());
      dispatch(resetProducts());
    };
  }, []);

  useEffect(() => {
    if (isCreating || isUpdating) {
      setIsSubmitted(true);
    }

    if (!isCreating && !isUpdating && isSubmitted) {
      navigate('/product');
    }
  }, [isCreating, isSubmitted, isUpdating, navigate, dispatch]);

  useEffect(() => {
    if (props.data) {
      setInitialValues(props.data);
    }
  }, [props.data]);

  const productFormSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),

    price: Yup.number()
      .min(0, 'Proce is greater than 0')
      .required('This field is required'),

    imageUrl: Yup.string(),
    description: Yup.string(),
  });

  const submitForm = (data: any) => {
    if (props.isCreate) {
      dispatch(createProduct({ product: data }));
    } else {
      dispatch(updateProduct({ productId: data.id, product: data }));
    }
  };

  const navigateToList = () => {
    navigate('/product');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productFormSchema}
      enableReinitialize={true}
      onSubmit={submitForm}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Fragment>
            <div className="text-2xl font-bold mb-8	">
              {props.isCreate ? 'Create ' : 'Edit'} product
            </div>
            <Card>
              <Form>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Product name" />
                  </div>
                  <TextInput
                    id="name"
                    placeholder="Product name"
                    color={errors.name && touched.name ? 'failure' : ''}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-red-700"
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="price" value="Price" />
                  </div>
                  <TextInput
                    id="price"
                    type="number"
                    placeholder="Price"
                    color={errors.price && touched.price ? 'failure' : ''}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <ErrorMessage
                    name="price"
                    component="span"
                    className="text-red-700"
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="imageUrl" value="Image url" />
                  </div>
                  <TextInput
                    id="imageUrl"
                    placeholder="imageUrl"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                  </div>
                  <Textarea
                    id="description"
                    placeholder="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    type="submit"
                    className={
                      !isValid || isCreating || isUpdating ? 'disabled-btn' : ''
                    }
                    disabled={!isValid || isCreating || isUpdating}
                  >
                    {isCreating || isUpdating ? <Spinner /> : 'Submit'}
                  </Button>

                  <Button
                    type="button"
                    className="ml-4"
                    onClick={navigateToList}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default ProductCreateEditForm;
