import axios from 'axios';
import { Dispatch } from 'redux';
import * as types from './types';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async (dispatch: Dispatch) => {
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
      type: types.LOAD_USER_FAIL
    });
  }
};

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: types.LOGIN_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: types.LOGIN_USER_FAIL
    });
  }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  dispatch({
    type: types.LOGOUT
  });
}

export const registerUser = (email: string, password: string, confirmPW: string) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password, confirmPW });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: types.REGISTER_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: types.REGISTER_USER_FAIL
    });
  }
};
