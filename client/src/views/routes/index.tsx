import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import createGenre from '../pages/createGenre';
import createManga from '../pages/createManga';
import editGenre from '../pages/editGenre';
import editManga from '../pages/editManga';
import editProfile from '../pages/editProfile';
import login from '../pages/login';
import manga from '../pages/manga';
import profile from '../pages/profile';
import register from '../pages/register';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';

import defaultRoute from './default';

import './index.css';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={defaultRoute} />
        <Route exact path='/index.html' component={defaultRoute} />
        <Route exact path='/genres/new' component={createGenre} />
        <Route exact path='/genres/:id/edit' component={editGenre} />
        <Route exact path='/login' component={login} />
        <Route exact path='/manga' component={manga} />
        <Route exact path='/manga/new' component={createManga} />
        <Route exact path='/manga/:id/edit' component={editManga} />
        <Route exact path='/profile' component={profile} />
        <Route exact path='/profile/edit' component={editProfile} />
        <Route exact path='/register' component={register} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default App;