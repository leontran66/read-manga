import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import * as types from './types';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: types.LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.LOAD_USER_FAIL,
      payload: err.response.data.errors
    });
  }
};

export const logoutUser = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch({
    type: types.LOGOUT
  });
};

export const loginUser = (email: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const data = { email, password };
  try {
    const res = await axios.post('/api/auth', data);

    dispatch({
      type: types.LOGIN_USER,
      payload: res.data
    });

    // dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: types.LOAD_USER_FAIL,
      payload: err.response.data.errors
    });
  }
};
