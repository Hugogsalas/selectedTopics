import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectToken } from '../../redux/auth/slice';

export interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authToken = useSelector(selectToken);

  console.log('AuthToken', authToken);

  if (!authToken || !children) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
