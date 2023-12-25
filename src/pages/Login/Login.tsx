import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Label,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as fromReducer from '../../store/reducers';
import { login } from '../../store/reducers/authSlice';
import ToastMessage from '../../components/ToastMessage/ToastMessage';

const LoginPage: React.FC<{}> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [initialValues] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const loading: boolean = useSelector(fromReducer.selectLoadings)[login.type];
  const message = useSelector(fromReducer.selectMessageType);

  useEffect(() => {
    if (loading) {
      setIsSubmitted(true);
    }

    if (!loading && isSubmitted && message !== 'error') {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isSubmitted, navigate, dispatch]);

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('This field is required'),

    password: Yup.string()
      .min(5, 'Password min length 5 characters.')
      .required('This field is required'),
  });

  const submitForm = (data: any) => {
    dispatch(login(data));
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      onSubmit={submitForm}
    >
      {(formik) => {
        const { errors, touched, isValid } = formik;
        return (
          <Fragment>
            <ToastMessage></ToastMessage>
            <div className="m-8 grid justify-center">
              <div className="text-2xl font-bold mb-8	text-center">Login</div>
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

                  <div className="mt-4 mb-4">
                    <Link to={'/signup'} className="text-blue-600 underline">
                      {' '}
                      Sign up
                    </Link>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      type="submit"
                      className={
                        !isValid || loading ? 'disabled-btn mr-2' : 'mr-2'
                      }
                      disabled={!isValid || loading}
                    >
                      {loading ? <Spinner /> : 'Login'}
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

export default LoginPage;
