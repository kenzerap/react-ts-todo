import React, { Fragment, useEffect } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as fromReducer from '../../store/reducers';
import { getUserById } from '../../store/reducers/userSlice';
import classes from './UserDetail.module.css';

const UserDetailPage: React.FC<{}> = (props) => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const userDetail = useSelector(fromReducer.selectUserDetail);
  const isLoading = useSelector(fromReducer.selectLoadings)[getUserById.type];

  useEffect(() => {
    dispatch(getUserById({ userId: userId || '' }));
  }, [dispatch, userId]);

  return (
    <div className={classes.layout}>
      <div className="text-2xl font-bold mb-8	">User detail</div>
      <Card>
        {isLoading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <Fragment>
            <div>
              <span className="font-bold"> Email: </span> {userDetail?.email}
            </div>
            <div>
              <span className="font-bold"> Name: </span>
              {userDetail?.name}
            </div>
            <div>
              <span className="font-bold"> Phone: </span>
              {userDetail?.phone}
            </div>
            <div>
              <span className="font-bold"> Address: </span>
              {userDetail?.address}
            </div>
          </Fragment>
        )}
      </Card>
    </div>
  );
};

export default UserDetailPage;
