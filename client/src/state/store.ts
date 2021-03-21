import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './ducks';

const preloadedState = {};

const rootReducer = combineReducers({
  alerts: reducers.alerts,
  auth: reducers.auth,
  genres: reducers.genres,
  manga: reducers.manga,
  readings: reducers.readings
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState,
  enhancers: []
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
