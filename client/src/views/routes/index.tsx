import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import createManga from '../pages/createManga';
import editManga from '../pages/editManga';
import genres from '../pages/genres';
import login from '../pages/login';
import manga from '../pages/manga';
import mangas from '../pages/mangas';
import profile from '../pages/profile';
import register from '../pages/register';

import Alert from '../components/common/Alert';
import defaultRoute from './default';
import NotFound from '../components/NotFound';
import PrivateRoute from '../utils/PrivateRoute';

import history from '../../history';
import { loadUser } from '../../state/ducks/auth/actions';
import setAuthToken from '../../state/utils/setAuthToken';
import store from '../../state/store';

import './index.css';

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
            <Alert />
            <Switch>
              <Route exact path='/' component={defaultRoute} />
              <Route exact path='/index.html' component={defaultRoute} />
              <Route exact path='/register' component={register} />
              <Route exact path='/login' component={login} />
              <PrivateRoute exact path='/profile' component={profile} />
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
