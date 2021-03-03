import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = () => (
  <Redirect to='/login' />
);

export default PrivateRoute;