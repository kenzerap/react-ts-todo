import { redirect } from 'react-router-dom';

export const checkAuthLoader = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return redirect('/login');
  }
  return null;
};
