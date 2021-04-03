import * as types from './types';

const initialState: types.AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  user: null,
  errors: []
};

export default function authReducer(state = initialState, action: types.AuthActionTypes): types.AuthState {
  switch(action.type) {
    case types.LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        errors: []
      }
    case types.LOGIN_USER:
    case types.REGISTER_USER:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errors: []
      };
    case types.UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        errors: []
      };
    case types.DELETE_USER_FAIL:
    case types.UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };
    case types.LOAD_USER_FAIL:
    case types.LOGIN_USER_FAIL:
    case types.REGISTER_USER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        errors: action.payload
      };
    case types.DELETE_USER:
    case types.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        errors: []
      };
    default:
      return state;
  }
}
