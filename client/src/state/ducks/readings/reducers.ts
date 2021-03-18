import * as types from './types';

const initialState: types.ReadingState = {
  readings: [],
  isLoading: true,
  errors: []
};

export default function readingsReducer(state = initialState, action: types.ReadingActionTypes): types.ReadingState {
  switch(action.type) {
    case types.LOAD_READINGS:
      return {
        ...state,
        readings: action.payload,
        isLoading: false,
        errors: []
      }
    case types.CREATE_READING:
    case types.DELETE_READING:
    case types.UPDATE_READING:
      return {
        ...state,
        isLoading: false,
        errors: []
      };
    case types.CREATE_READING_FAIL:
    case types.DELETE_READING_FAIL:
    case types.LOAD_READINGS_FAIL:
    case types.UPDATE_READING_FAIL:
      return {
        ...state,
        readings: [],
        isLoading: false,
        errors: action.payload
      }
    default:
      return state;
  }
}
