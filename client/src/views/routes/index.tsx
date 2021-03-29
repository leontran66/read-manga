import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import genres from '../pages/genres';
import login from '../pages/login';
import manga from '../pages/manga';
import profile from '../pages/profile';
import register from '../pages/register';

import Alert from '../components/common/Alert';
import defaultRoute from './default';
import NotFound from '../components/NotFound';

import { loadUser } from '../../state/ducks/auth/actions';
import setAuthToken from '../../state/utils/setAuthToken';
import store from '../../state/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.min.js';
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
        <Router>
          <Fragment>
            <Alert />
            <Switch>
              <Route exact path='/' component={defaultRoute} />
              <Route exact path='/index.html' component={defaultRoute} />
              <Route exact path='/genres' component={genres} />
              <Route exact path='/login' component={login} />
              <Route exact path='/manga' component={manga} />
              <Route exact path='/profile' component={profile} />
              <Route exact path='/register' component={register} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
  );
};

export default App;
