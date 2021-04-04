import { Error } from '../../types/Error';

export const LOAD_ALL_MANGA = 'LOAD_ALL_MANGA';
export const LOAD_MANGA_FAIL = 'LOAD_MANGA_FAIL';
export const CREATE_MANGA = 'CREATE_MANGA';
export const CREATE_MANGA_FAIL = 'CREATE_MANGA_FAIL';
export const DELETE_MANGA = 'DELETE_MANGA';
export const DELETE_MANGA_FAIL = 'DELETE_MANGA_FAIL';
export const UPDATE_MANGA = 'UPDATE_MANGA';
export const UPDATE_MANGA_FAIL = 'UPDATE_MANGA_FAIL';

export type Manga = {
  _id: string,
  title: string,
  author: string,
  synopsis: string,
  chapters: number,
  thumbnail: string
}

export interface MangaState {
  manga: Array<Manga>,
  isLoading: boolean,
  errors: Array<Error>
}

interface LoadAction {
  type: typeof LOAD_ALL_MANGA,
  payload: Array<Manga>
}

interface MangaAction {
  type: typeof CREATE_MANGA | typeof DELETE_MANGA | typeof UPDATE_MANGA
}

interface FailAction {
  type: typeof LOAD_MANGA_FAIL | typeof CREATE_MANGA_FAIL | typeof DELETE_MANGA_FAIL | typeof UPDATE_MANGA_FAIL,
  payload: Array<Error>
}

export type MangaActionTypes = FailAction | LoadAction | MangaAction;
