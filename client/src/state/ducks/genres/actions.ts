import axios from 'axios';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';

export const loadAllGenres = (): AppThunk => async dispatch => {
  try {
    const res = await axios.get('/api/genres');

    dispatch({
      type: types.LOAD_ALL_GENRES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.LOAD_GENRE_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const createGenre = (name: string): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { name };

  try {
    await axios.post('/api/genres', data, config);

    dispatch({
      type: types.CREATE_GENRE
    });
  } catch (err) {
    dispatch({
      type: types.CREATE_GENRE_FAIL,
      payload: err.response.data.errors
    });
  }
}

  export const updateGenre = (id: string, name: string): AppThunk => async dispatch => {  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { name };

  try {
    await axios.patch('/api/genres/' + id, data, config);

    dispatch({
      type: types.UPDATE_GENRE
    });
  } catch (err) {
    dispatch({
      type: types.UPDATE_GENRE_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const deleteGenre = (id: string): AppThunk => async dispatch => {
  try {
    await axios.delete('/api/genres/' + id);

    dispatch({
      type: types.DELETE_GENRE
    });
  } catch (err) {
    dispatch({
      type: types.DELETE_GENRE_FAIL,
      payload: err.response.data.errors
    });
  }
}
