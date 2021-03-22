import { Error } from '../../types/Error';

export const LOAD_READINGS = 'LOAD_READINGS';
export const LOAD_READINGS_FAIL = 'LOAD_READINGS_FAIL';
export const CREATE_READING = 'CREATE_READING';
export const CREATE_READING_FAIL = 'CREATE_READING_FAIL';
export const DELETE_READING = 'DELETE_READING';
export const DELETE_READING_FAIL = 'DELETE_READING_FAIL';
export const UPDATE_READING = 'UPDATE_READING';
export const UPDATE_READING_FAIL = 'UPDATE_READING_FAIL';

export type Reading = {
  _id: string,
  manga: string,
  chapter: number
}

export interface ReadingState {
  readings: Array<Reading>,
  isLoading: boolean,
  errors: Array<Error>
}

interface LoadAction {
  type: typeof LOAD_READINGS,
  payload: Array<Reading>
}

interface ReadingAction {
  type: typeof CREATE_READING | typeof DELETE_READING | typeof UPDATE_READING
}

interface FailAction {
  type: typeof CREATE_READING_FAIL | typeof DELETE_READING_FAIL | typeof LOAD_READINGS_FAIL | typeof UPDATE_READING_FAIL,
  payload: Array<Error>
}

export type ReadingActionTypes = FailAction | LoadAction | ReadingAction;
