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

export type Error = {
  msg: string
}

export type Token = string;

export type User = {
  email: string,
  password: string
}

export interface AuthState {
  token: Token | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  user: User | null,
  errors: [Error] | []
};

interface DeleteUserAction {
  type: typeof DELETE_USER
}

interface DeleteUserFail {
  type: typeof DELETE_USER_FAIL,
  payload: [Error]
}

interface LoadUserAction {
  type: typeof LOAD_USER,
  payload: User
}

interface LoadUserFail {
  type: typeof LOAD_USER_FAIL,
  payload: [Error]
}

interface LoginUserAction {
  type: typeof LOGIN_USER,
  payload: Token
}

interface LoginUserFail {
  type: typeof LOGIN_USER_FAIL,
  payload: [Error]
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface RegisterUserAction {
  type: typeof REGISTER_USER,
  payload: Token
}

interface RegisterUserFail {
  type: typeof REGISTER_USER_FAIL,
  payload: [Error]
}

interface UpdateUserAction {
  type: typeof UPDATE_USER
}

interface UpdateUserFail {
  type: typeof UPDATE_USER_FAIL,
  payload: [Error]
}

export type AuthActionTypes = DeleteUserAction | DeleteUserFail | LoadUserAction | LoadUserFail | LoginUserAction | LoginUserFail | LogoutAction | RegisterUserAction | RegisterUserFail | UpdateUserAction | UpdateUserFail;
