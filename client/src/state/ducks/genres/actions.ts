import axios from 'axios';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';
import { setAlert, setSuccessAlert } from '../alerts/actions';

export const loadAllGenres = (): AppThunk => async dispatch => {
  try {
    const res = await axios.get('/api/genres');

    dispatch({
      type: types.LOAD_ALL_GENRES,
      payload: res.data.genres
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
    const res = await axios.post('/api/genres', data, config);

    dispatch({
      type: types.CREATE_GENRE
    });

    dispatch(loadAllGenres());

    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.CREATE_GENRE_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const updateGenre = (id: string, name: string, oldName: string): AppThunk => async dispatch => {  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { name };

  try {
    const res = await axios.patch('/api/genres/' + id, data, config);

    dispatch({
      type: types.UPDATE_GENRE
    });

    dispatch(loadAllGenres());

    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    dispatch({
      type: types.UPDATE_GENRE_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const deleteGenre = (id: string): AppThunk => async dispatch => {
  try {
    const res = await axios.delete('/api/genres/' + id);

    dispatch({
      type: types.DELETE_GENRE
    });

    dispatch(loadAllGenres());
    
    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    dispatch({
      type: types.DELETE_GENRE_FAIL,
      payload: err.response.data.errors
    });
  }
}
