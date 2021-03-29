import * as types from './types';

const initialState: types.MangaState = {
  manga: [],
  isLoading: true,
  errors: []
};

export default function mangaReducer(state = initialState, action: types.MangaActionTypes): types.MangaState {
  switch (action.type) {
    case types.LOAD_ALL_MANGA:
      return {
        ...state,
        manga: action.payload,
        isLoading: false,
        errors: []
      };
    case types.CREATE_MANGA:
    case types.DELETE_MANGA:
    case types.UPDATE_MANGA:
      return {
        ...state,
        isLoading: false,
        errors: []
      };
    case types.LOAD_MANGA_FAIL:
      return {
        ...state,
        manga: [],
        isLoading: false,
        errors: action.payload
      }
    case types.CREATE_MANGA_FAIL:
    case types.DELETE_MANGA_FAIL:
    case types.UPDATE_MANGA_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
