import axios from 'axios';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';

export const loadReadings = (): AppThunk => async dispatch => {
  try {
    const res = await axios.get('/api/readings');

    dispatch({
      type: types.LOAD_READINGS,
      payload: res.data
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
    await axios.post('/api/readings', data, config);

    dispatch({
      type: types.CREATE_READING
    });
  } catch (err) {
    dispatch({
      type: types.CREATE_READING_FAIL,
      payload: err.response.data.errors
    });
  }
}

  export const updateReading = (id: string, chapter: number): AppThunk => async dispatch => {  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { chapter };

  try {
    await axios.patch('/api/readings/' + id, data, config);

    dispatch({
      type: types.UPDATE_READING
    });
  } catch (err) {
    dispatch({
      type: types.UPDATE_READING_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const deleteReading = (id: string): AppThunk => async dispatch => {
  try {
    await axios.delete('/api/readings/' + id);

    dispatch({
      type: types.DELETE_READING
    });
  } catch (err) {
    dispatch({
      type: types.DELETE_READING_FAIL,
      payload: err.response.data.errors
    });
  }
}
