import axios from 'axios';
import * as types from './types';
import { AppThunk } from '../../types/AppThunk';

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
    await axios.post('/api/manga', data, config);

    dispatch({
      type: types.CREATE_MANGA
    });
  } catch (err) {
    dispatch({
      type: types.CREATE_MANGA_FAIL,
      payload: err.response.data.errors
    });
  }
}

  export const updateGenre = (id: string, title: string, author: string, synopsis: string, chapters: number): AppThunk => async dispatch => {  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = { title, author, synopsis, chapters };

  try {
    await axios.patch('/api/manga/' + id, data, config);

    dispatch({
      type: types.UPDATE_MANGA
    });
  } catch (err) {
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
