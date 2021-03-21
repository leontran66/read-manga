import * as types from './types';

const initialState: types.AlertState = [];

export default function alertsReducer(state = initialState, action: types.AlertActionTypes): types.AlertState {
  switch(action.type) {
    case types.SET_ALERT:
      return [...state, action.payload];
    case types.REMOVE_ALERT:
      return state.filter((alert: types.Alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
