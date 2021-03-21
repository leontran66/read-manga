import axios from 'axios';
import $ from 'jquery';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';
import { setAlert } from '../alerts/actions';
import setAuthToken from '../../utils/setAuthToken';
import history from '../../../history';

export const loadUser = (): AppThunk => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: types.LOAD_USER,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({
      type: types.LOAD_USER_FAIL,
      payload: err.response.data.errors
    });
  }
};

export const loginUser = (email: string, password: string): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { email, password };

  try {
    const res = await axios.post('/api/auth', data, config);

    dispatch({
      type: types.LOGIN_USER,
      payload: res.data.token
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.LOGIN_USER_FAIL,
      payload: err.response.data.errors
    });
  }
};

export const logoutUser = (): AppThunk => async dispatch => {
  dispatch({
    type: types.LOGOUT
  });
};

export const registerUser = (email: string, password: string, confirmPW: string): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { email, password, confirmPW };

  try {
    const res = await axios.post('/api/users', data, config);

    dispatch({
      type: types.REGISTER_USER,
      payload: res.data.token
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.REGISTER_USER_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const updateUser = (currentPW: string, password: string, confirmPW: string): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { currentPW, password, confirmPW };

  try {
    await axios.patch('/api/users', data, config);

    dispatch({
      type: types.UPDATE_USER
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.UPDATE_USER_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const deleteUser = (): AppThunk => async dispatch => {
  try {
    await axios.delete('/api/users');

    dispatch({
      type: types.DELETE_USER
    });

    history.push('/');
  } catch (err) {
    dispatch({
      type: types.DELETE_USER_FAIL,
      payload: err.response.data.errors
    });
  }
}
