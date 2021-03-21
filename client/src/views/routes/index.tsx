import { Fragment, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import createManga from '../pages/createManga';
import editManga from '../pages/editManga';
import editProfile from '../pages/editProfile';
import genres from '../pages/genres';
import login from '../pages/login';
import manga from '../pages/manga';
import mangas from '../pages/mangas';
import profile from '../pages/profile';
import register from '../pages/register';

import defaultRoute from './default';
import NotFound from '../components/NotFound';
import PrivateRoute from '../utils/PrivateRoute';

import './index.css';

import { Provider } from 'react-redux';
import history from '../../history';
import store from '../../state/store';
import { loadUser } from '../../state/ducks/auth/actions';
import setAuthToken from '../../state/utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch<any>(loadUser());
  }, []);

  return (
      <Provider store={store}>
        <Router history={history}>
          <Fragment>
            <Switch>
              <Route exact path='/' component={defaultRoute} />
              <Route exact path='/index.html' component={defaultRoute} />
              <Route exact path='/register' component={register} />
              <Route exact path='/login' component={login} />
              <PrivateRoute exact path='/profile' component={profile} />
              <PrivateRoute path='/profile/edit' component={editProfile} />
              <PrivateRoute exact path='/manga/new' component={createManga} />
              <PrivateRoute path='/manga/:id/edit' component={editManga} />
              <PrivateRoute exact path='/genres' component={genres} />
              <Route path='/manga/:id' component={manga} />
              <Route exact path='/manga' component={mangas} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
  );
};

export default App;
