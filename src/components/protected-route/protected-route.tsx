import React from 'react';
import { useSelector } from '../../store/store';
import { FC } from 'react';
import {
  getUserSelector,
  isAuthCheckedSelector
} from '../../services/user/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
interface ProtectedRoutOrops {
  onlyInAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute: FC<ProtectedRoutOrops> = ({
  onlyInAuth = false,
  children
}) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyInAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyInAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
