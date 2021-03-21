export const REMOVE_ALERT = 'REMOVE_ALERT';
export const SET_ALERT = 'SET_ALERT';

export type Alert = {
  id: string,
  alertField: string,
  msg: string
}

export type AlertState = Array<Alert>;

type AlertAction = {
  type: typeof SET_ALERT,
  payload: Alert
}

type RemoveAlertAction = {
  type: typeof REMOVE_ALERT,
  payload: string
}

export type AlertActionTypes = AlertAction | RemoveAlertAction;
