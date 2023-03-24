import React from 'react';
import { useAuth } from './authContextProvider';
import { Navigate } from 'react-router-dom';


function PublicRoute({ children }) {
  const { checkIsUsersLogin } = useAuth();

  if (checkIsUsersLogin()) {
    return <Navigate to="/products" />;
  }
  return (
    <>
      {children}
    </>
  );
};

export default PublicRoute;