import * as types from './types';

const initialState: types.AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  user: null
};

export default function authReducer(state = initialState, action: types.AuthActionTypes): types.AuthState {
  switch(action.type) {
    case types.LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case types.LOGIN_USER:
    case types.REGISTER_USER:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case types.LOAD_USER_FAIL:
    case types.LOGIN_USER_FAIL:
    case types.LOGOUT:
    case types.REGISTER_USER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null
      }
    default:
      return state;
  }
}
