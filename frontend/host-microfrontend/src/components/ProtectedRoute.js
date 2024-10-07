import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from 'auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
      <Route
          {...props}
          render={(props) =>
              isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />
          }
      />
  );
};

export default ProtectedRoute;
