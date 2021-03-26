import * as types from './types';

const initialState: types.GenreState = {
  genres: [],
  isLoading: true,
  errors: []
};

export default function genresReducer(state = initialState, action: types.GenreActionTypes): types.GenreState {
  switch(action.type) {
    case types.LOAD_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
        isLoading: false,
        errors: []
      }
    case types.CREATE_GENRE:
    case types.DELETE_GENRE:
    case types.UPDATE_GENRE:
      return {
        ...state,
        isLoading: false,
        errors: []
      };
    case types.CREATE_GENRE_FAIL:
    case types.DELETE_GENRE_FAIL:
    case types.LOAD_GENRE_FAIL:
    case types.UPDATE_GENRE_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
