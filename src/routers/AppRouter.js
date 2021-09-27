import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import {
  Login,
  Signup,
  Contacts,
  RequestResetPassword,
  ResetPassword,
} from '../components/pages';
import { Header } from '../components';

const AppRouter = (props) => {
  return (
    <Router>
      <div className="router">
        <Header />
        <Switch>
          <PublicRoute path="/" component={Login} exact={true} />
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute
            path="/request-reset-password"
            component={RequestResetPassword}
          />
          <PublicRoute path="/reset-password" component={ResetPassword} />
          <PrivateRoute path="/contacts" component={Contacts} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
