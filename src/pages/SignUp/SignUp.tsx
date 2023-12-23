import React, { Fragment, useEffect, useState } from 'react';
import classes from './Login.module.css';
import {
  Button,
  Card,
  Label,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as fromReducer from '../../store/reducers';
import { signup } from '../../store/reducers/authSlice';
import ToastMessage from '../../components/ToastMessage/ToastMessage';

const SignUpPage: React.FC<{}> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
    address: string;
  }>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
  });

  const loading: boolean = useSelector(fromReducer.selectLoadings)[signup.type];
  const message = useSelector(fromReducer.selectMessageType);

  useEffect(() => {
    if (loading) {
      setIsSubmitted(true);
    }

    if (!loading && isSubmitted && message !== 'error') {
      navigate('/login');
    }
  }, [loading, isSubmitted, navigate, dispatch]);

  const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('This field is required'),

    password: Yup.string()
      .min(5, 'Password min length 5 characters.')
      .required('This field is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), undefined, ''],
      'Passwords must match'
    ),

    name: Yup.string().required('This field is required'),
    phone: Yup.number().min(0, 'Invalid phone number'),
    address: Yup.string(),
  });

  const submitForm = (data: any) => {
    console.log('data: ', data);
    dispatch(
      signup({
        userData: {
          email: data.email,
          password: data.password,
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
      })
    );
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupFormSchema}
      onSubmit={submitForm}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Fragment>
            <ToastMessage></ToastMessage>
            <div className="m-8 grid justify-center">
              <div className="text-2xl font-bold mb-8	text-center">Sign up</div>
              <Card className="min-w-96">
                <Form>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                      id="email"
                      type="text"
                      placeholder="Email"
                      color={errors.email && touched.email ? 'failure' : ''}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-red-700"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      color={
                        errors.password && touched.password ? 'failure' : ''
                      }
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-700"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="confirmPassword"
                        value="Confirm password"
                      />
                    </div>
                    <TextInput
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      color={
                        errors.confirmPassword && touched.confirmPassword
                          ? 'failure'
                          : ''
                      }
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className="text-red-700"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput
                      id="name"
                      type="text"
                      placeholder="Name"
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

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="phone" value="Phone" />
                    </div>
                    <TextInput
                      id="phone"
                      type="number"
                      placeholder="Phone"
                      color={errors.phone && touched.phone ? 'failure' : ''}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      name="phone"
                      component="span"
                      className="text-red-700"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="address" value="Address" />
                    </div>
                    <TextInput
                      id="address"
                      type="text"
                      placeholder="Address"
                      color={errors.address && touched.address ? 'failure' : ''}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <ErrorMessage
                      name="address"
                      component="span"
                      className="text-red-700"
                    />
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      type="submit"
                      className={
                        !isValid || loading ? 'disabled-btn mr-2' : 'mr-2'
                      }
                      disabled={!isValid || loading}
                    >
                      {loading ? <Spinner /> : 'Sign up'}
                    </Button>

                    <Button
                      type="button"
                      className="ml-2"
                      onClick={navigateToHome}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card>
            </div>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default SignUpPage;
