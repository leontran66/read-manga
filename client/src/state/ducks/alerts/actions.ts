import * as types from './types';
import { AppThunk } from '../../types/AppThunk';
import { v4 as uuid } from 'uuid';

export const setAlert = (msg: string, field: string): AppThunk => async dispatch => {
  const id = uuid();
  dispatch({
    type: types.SET_ALERT,
    payload: { msg, field, id }
  });
};

export const removeAlert = (field: string): AppThunk => async dispatch => {
  dispatch({
    type: types.REMOVE_ALERT,
    payload: field
  })
};

export const setSuccessAlert = (msg: string, timeout = 5000): AppThunk => async dispatch => {
  const id = uuid();
  dispatch({
    type: types.SET_ALERT,
    payload: { msg, field: 'success', id }
  });

  setTimeout(() => {
    dispatch({
      type: types.REMOVE_ALERT,
      payload: 'success'
    })
  }, timeout);
}
