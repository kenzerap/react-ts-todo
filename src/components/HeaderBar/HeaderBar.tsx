import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import classes from './HeaderBar.module.css';
import { Link, NavLink } from 'react-router-dom';

const HeaderBar: React.FC<{}> = (props) => {
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
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Edit profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink
          to={''}
          className={({ isActive }) => [isActive ? `${classes.linkActive}` : ''].join(' ')}
        >
          Home
        </NavLink>
        <NavLink
          to={'product'}
          className={({ isActive }) => [isActive ? `${classes.linkActive}` : ''].join(' ')}
        >
          Products
        </NavLink>
        <NavLink
          to={'user'}
          className={({ isActive }) => [isActive ? `${classes.linkActive}` : ''].join(' ')}
        >
          Users
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderBar;
