import axios from 'axios';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';
import { setAlert, setSuccessAlert } from '../alerts/actions';
import { loadReadings } from '../readings/actions';
import { loadAllGenres } from '../genres/actions';

export const loadAllManga = (query?: string): AppThunk => async dispatch => {
  let url = '/api/manga?q=';

  try {
    const res = await axios.get(url + (query ? query : ''));

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

export const createManga = (title: string, author: string, genres: Array<string>, synopsis: string, chapters: number, thumbnail: string, query?: string): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { title, author, genres, synopsis, chapters, thumbnail };

  try {
    const res = await axios.post('/api/manga', data, config);

    dispatch({
      type: types.CREATE_MANGA
    });

    dispatch(loadAllManga(query ? query : undefined));
    dispatch(loadAllGenres());
    
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

export const updateManga = (id: string, title: string, author: string, genres: Array<string>, synopsis: string, chapters: number, thumbnail: string, query?: string): AppThunk => async dispatch => {    
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { title, author, genres, synopsis, chapters, thumbnail };

  try {
    const res = await axios.patch('/api/manga/' + id, data, config);

    dispatch({
      type: types.UPDATE_MANGA
    });

    dispatch(loadAllManga(query ? query : undefined));
    dispatch(loadAllGenres());
    
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

export const deleteManga = (id: string, query?: string): AppThunk => async dispatch => {
  try {
    const res = await axios.delete('/api/manga/' + id);

    dispatch({
      type: types.DELETE_MANGA
    });

    dispatch(loadAllManga(query ? query : undefined));
    dispatch(loadAllGenres());
    dispatch(loadReadings());

    dispatch(setSuccessAlert(res.data.msg));
  } catch (err) {
    dispatch({
      type: types.DELETE_MANGA_FAIL,
      payload: err.response.data.errors
    });
  }
}
