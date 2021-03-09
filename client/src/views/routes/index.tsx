import { Switch, Route } from 'react-router-dom';

import login from '../pages/login';
import manga from '../pages/manga';
import profile from '../pages/profile';
import register from '../pages/register';

import defaultRoute from './default';

import '../../App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={defaultRoute} />
      <Route exact path='/index.html' component={defaultRoute} />
      <Route exact path='/login' component={login} />
      <Route exact path='/manga' component={manga} />
      <Route exact path='/profile' component={profile} />
      <Route exact path='/register' component={register} />
    </Switch>
  );
};

export default App;