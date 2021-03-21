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

export const removeAlert = (id: string): AppThunk => async dispatch => {
  dispatch({
    type: types.REMOVE_ALERT,
    payload: id
  })
};
