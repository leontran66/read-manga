import { Error } from '../../types/Error';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGOUT = 'LOGOUT';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

type Token = string;

type User = {
  email: string
}

export interface AuthState {
  token: Token | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  user: User | null,
  errors: [Error] | []
};

interface AuthAction {
  type: typeof LOGIN_USER | typeof REGISTER_USER,
  payload: Token
}

interface LoadAction {
  type: typeof LOAD_USER,
  payload: User
}

interface UserAction {
  type: typeof DELETE_USER | typeof LOGOUT | typeof UPDATE_USER
}

interface FailAction {
  type: typeof DELETE_USER_FAIL | typeof LOAD_USER_FAIL | typeof LOGIN_USER_FAIL | typeof REGISTER_USER_FAIL | typeof UPDATE_USER_FAIL,
  payload: [Error]
}

export type AuthActionTypes = AuthAction | FailAction | LoadAction | UserAction;
