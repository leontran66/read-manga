import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import login from '../pages/login';
import manga from '../pages/manga';
import profile from '../pages/profile';
import register from '../pages/register';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';

import defaultRoute from './default';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={defaultRoute} />
        <Route exact path='/index.html' component={defaultRoute} />
        <Route exact path='/login' component={login} />
        <Route exact path='/manga' component={manga} />
        <Route exact path='/profile' component={profile} />
        <Route exact path='/register' component={register} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default App;