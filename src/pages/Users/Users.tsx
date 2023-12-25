import React, { Fragment, useEffect } from 'react';
import { Card, Spinner, Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import * as fromReducer from '../../store/reducers';
import {
  getUsers,
  deleteUser,
  resetUserState,
} from '../../store/reducers/userSlice';
import { User } from '../../models/user.model';
import { Link } from 'react-router-dom';
import { resetLoading } from '../../store/reducers/uiLoadingSlice';

const UsersPage: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const loading: boolean = useSelector(fromReducer.selectLoadings)[
    getUsers.type
  ];
  const users: User[] = useSelector(fromReducer.selectUsers);
  const deleting: boolean = useSelector(fromReducer.selectLoadings)[
    deleteUser.type
  ];

  useEffect(() => {
    dispatch(getUsers());

    return () => {
      dispatch(resetLoading());
      dispatch(resetUserState());
    };
  }, [dispatch]);

  const deleteUserHandler = (userId: string) => {
    dispatch(deleteUser({ userId }));
  };

  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">User list</div>
        <div></div>
      </div>

      <Card className="overflow-x-auto">
        {loading ? (
          <div className="text-center">
            <Spinner aria-label="loading" />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {(users || []).map((user) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={user.id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                    <Table.Cell>
                      <Link
                        to={''}
                        onClick={() => deleteUserHandler(user.id)}
                        className={`font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-4 ${
                          deleting ? 'pointer-events-none' : ''
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
    </Fragment>
  );
};

export default UsersPage;
