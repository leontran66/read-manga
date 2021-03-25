import axios from 'axios';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';
import { setAlert, setSuccessAlert } from '../alerts/actions';

export const loadReadings = (): AppThunk => async dispatch => {
  try {
    const res = await axios.get('/api/readings');

    dispatch({
      type: types.LOAD_READINGS,
      payload: res.data.readings
    });
  } catch (err) {
    dispatch({
      type: types.LOAD_READINGS_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const createReading = (title: string, chapter: number): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { title, chapter };

  try {
    const res = await axios.post('/api/readings', data, config);

    dispatch({
      type: types.CREATE_READING
    });

    dispatch(loadReadings());

    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.CREATE_READING_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const updateReading = (title: string, chapter: number): AppThunk => async dispatch => {  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { title, chapter };

  try {
    const res = await axios.patch('/api/readings', data, config);

    dispatch({
      type: types.UPDATE_READING
    });

    dispatch(loadReadings());

    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.UPDATE_READING_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const deleteReading = (id: string): AppThunk => async dispatch => {
  try {
    const res = await axios.delete('/api/readings/' + id);

    dispatch({
      type: types.DELETE_READING
    });

    dispatch(loadReadings());

    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    dispatch({
      type: types.DELETE_READING_FAIL,
      payload: err.response.data.errors
    });
  }
}
