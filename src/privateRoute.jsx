import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContextProvider';


function PrivateRoute({ children }) {
  const { checkIsUsersLogin } = useAuth()

  if (!checkIsUsersLogin()) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {children}
    </>
  );
};

export default PrivateRoute;