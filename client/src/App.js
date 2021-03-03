import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Routes from './components/routes/Routes';

import { Provider } from 'react-redux';
import configureStore from './store';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route component={Routes} />
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
