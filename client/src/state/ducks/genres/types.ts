import { Error } from '../../types/Error';

export const CREATE_GENRE = 'CREATE_GENRE';
export const CREATE_GENRE_FAIL = 'CREATE_GENRE_FAIL';
export const DELETE_GENRE = 'DELETE_GENRE';
export const DELETE_GENRE_FAIL = 'DELETE_GENRE_FAIL';
export const LOAD_ALL_GENRES = 'LOAD_ALL_GENRES';
export const LOAD_GENRE_FAIL = 'LOAD_GENRE_FAIL';
export const UPDATE_GENRE = 'UPDATE_GENRE';
export const UPDATE_GENRE_FAIL = 'UPDATE_GENRE_FAIL';

type Genre = {
  name: string,
  manga: [string]
}

export interface GenreState {
  genres: Array<Genre>,
  isLoading: boolean,
  errors: Array<Error>
}

interface LoadAction {
  type: typeof LOAD_ALL_GENRES,
  payload: Array<Genre>
}

interface GenreAction {
  type: typeof CREATE_GENRE | typeof DELETE_GENRE | typeof UPDATE_GENRE
}

interface FailAction {
  type: typeof CREATE_GENRE_FAIL | typeof DELETE_GENRE_FAIL | typeof LOAD_GENRE_FAIL | typeof UPDATE_GENRE_FAIL,
  payload: Array<Error>
}

export type GenreActionTypes = FailAction | GenreAction | LoadAction;