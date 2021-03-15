export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGOUT = 'LOGOUT';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export type Token = string;

export type User = {
  email: string,
  password: string
}

export interface AuthState {
  token: Token | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  user: User | null
};

interface LoadUserAction {
  type: typeof LOAD_USER,
  payload: User
}

interface LoadUserFail {
  type: typeof LOAD_USER_FAIL
}

interface LoginUserAction {
  type: typeof LOGIN_USER,
  payload: Token
}

interface LoginUserFail {
  type: typeof LOGIN_USER_FAIL
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface RegisterUserAction {
  type: typeof REGISTER_USER,
  payload: Token
}

interface RegisterUserFail {
  type: typeof REGISTER_USER_FAIL
}

export type AuthActionTypes = LoadUserAction | LoadUserFail | LoginUserAction | LoginUserFail | LogoutAction | RegisterUserAction | RegisterUserFail;
