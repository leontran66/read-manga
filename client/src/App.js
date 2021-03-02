import React from 'react'

import { Provider } from 'react-redux'
import configureStore from './store'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        frontend
      </div>
    </Provider>
  );
}

export default App
