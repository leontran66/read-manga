import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Genres from '../genres/Genres';
import Landing from '../layout/Landing';
import List from '../lists/List';
import Login from '../auth/Login';
import Mangas from '../manga/Mangas';
import Profile from '../users/Profile';
import Register from '../auth/Register';

const Routes = () => {
  return(
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/genres' component={Genres} />
      <Route exact path='/list' component={List} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/manga' component={Mangas} />
      <Route exact path='/dashboard' component={Profile} />
      <Route exact path='/register' component={Register} />
    </Switch>
  );
};

export default Routes;