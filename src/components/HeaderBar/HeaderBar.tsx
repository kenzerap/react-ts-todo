import React from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import classes from './HeaderBar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import * as fromReducer from '../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../models/user.model';
import { logout } from '../../store/reducers/authSlice';
import CartShopping from '../CartShopping/CartShopping';

const HeaderBar: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo: User | null = useSelector(fromReducer.selectUserInfo);
  const isAdmin: boolean = useSelector(fromReducer.selectIsAdmin);
  const selectedItem: number = useSelector(fromReducer.selectCartItemCount);

  const logOutHandeler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar fluid className={classes.navBar}>
      <Navbar.Brand>
        <img
          src="https://www.flowbite-react.com/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ReactPee
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="mr-8">
          <CartShopping selectedItem={selectedItem}></CartShopping>
        </div>

        {userInfo ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{userInfo.name}</span>
              <span className="block truncate text-sm font-medium">
                {userInfo.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to={`/user/${userInfo.id}`}>View profile</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOutHandeler}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={'/login'}>
            <Button type="button">Login</Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink
          to={''}
          className={({ isActive }) =>
            [isActive ? `${classes.linkActive}` : ''].join(' ')
          }
        >
          Home
        </NavLink>
        <NavLink
          to={'product'}
          className={({ isActive }) =>
            [isActive ? `${classes.linkActive}` : ''].join(' ')
          }
        >
          Products
        </NavLink>
        {isAdmin && (
          <NavLink
            to={'user'}
            className={({ isActive }) =>
              [isActive ? `${classes.linkActive}` : ''].join(' ')
            }
          >
            Users
          </NavLink>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderBar;
