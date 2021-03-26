import axios from 'axios';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';
import { setAlert, setSuccessAlert } from '../alerts/actions';

export const loadAllManga = (): AppThunk => async dispatch => {
  try {
    const res = await axios.get('/api/manga');

    dispatch({
      type: types.LOAD_ALL_MANGA,
      payload: res.data.manga
    });
  } catch (err) {
    dispatch({
      type: types.LOAD_MANGA_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const loadManga = (id: string): AppThunk => async dispatch => {
  try {
    const res = await axios.get('/api/manga/' + id);

    dispatch({
      type: types.LOAD_MANGA,
      payload: [res.data.manga]
    });
  } catch (err) {
    dispatch({
      type: types.LOAD_MANGA_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const createManga = (title: string, author: string, synopsis: string, chapters: number): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { title, author, synopsis, chapters };

  try {
    const res = await axios.post('/api/manga', data, config);

    dispatch({
      type: types.CREATE_MANGA
    });

    dispatch(loadAllManga());
    
    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.CREATE_MANGA_FAIL,
      payload: err.response.data.errors
    });
  }
}

  export const updateManga = (id: string, title: string, author: string, synopsis: string, chapters: number): AppThunk => async dispatch => {  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { title, author, synopsis, chapters };

  try {
    const res = await axios.patch('/api/manga/' + id, data, config);

    dispatch({
      type: types.UPDATE_MANGA
    });

    dispatch(loadAllManga());
    
    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, error.param)));
    }

    dispatch({
      type: types.UPDATE_MANGA_FAIL,
      payload: err.response.data.errors
    });
  }
}

export const deleteManga = (id: string): AppThunk => async dispatch => {
  try {
    await axios.delete('/api/manga/' + id);

    dispatch({
      type: types.DELETE_MANGA
    });
  } catch (err) {
    dispatch({
      type: types.DELETE_MANGA_FAIL,
      payload: err.response.data.errors
    });
  }
}
