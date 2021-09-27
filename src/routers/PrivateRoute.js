import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routerProps) => {
        return isAuth() ? <Component {...routerProps} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
