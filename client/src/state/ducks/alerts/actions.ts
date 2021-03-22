import * as types from './types';
import { AppThunk } from '../../types/AppThunk';
import { v4 as uuid } from 'uuid';

export const setAlert = (msg: string, alertField: string): AppThunk => async dispatch => {
  const id = uuid();
  dispatch({
    type: types.SET_ALERT,
    payload: { msg, alertField, id }
  });
};

export const removeAlert = (alertField: string): AppThunk => async dispatch => {
  dispatch({
    type: types.REMOVE_ALERT,
    payload: alertField
  })
};

export const setSuccessAlert = (msg: string, timeout = 5000): AppThunk => async dispatch => {
  const id = uuid();
  dispatch({
    type: types.SET_ALERT,
    payload: { msg, alertField: 'success', id }
  });

  setTimeout(() => {
    dispatch({
      type: types.REMOVE_ALERT,
      payload: 'success'
    })
  }, timeout);
}
