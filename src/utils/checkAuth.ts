import { redirect } from 'react-router-dom';
import { User } from '../models/user.model';

export const checkAuthLoader = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return redirect('/login');
  }
  return null;
};

export const isAdminLoader = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return redirect('/login');
  }

  const userInfo = localStorage.getItem('userInfo');
  const user: User = userInfo ? JSON.parse(userInfo) : null;

  if (!user || !user.isAdmin) {
    return redirect('/login');
  }
  return null;
};
