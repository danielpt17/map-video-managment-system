import {Action} from '@ngrx/store';
import {AlertModel} from '../../modules/home/models/alert.model';

export const GET_ALERTS = 'GET_ALERTS';
export const ADD_ALERT = 'ADD_ALERT';
export const START_ADDING_ALERTS = 'START_ADDING_ALERTS';
export const STOP_ADDING_ALERTS = 'STOP_ADDING_ALERTS';

export class StartAddingAlertAction implements Action {
  readonly type = START_ADDING_ALERTS;

  constructor(public payload: AlertModel) {
  }
}

export class StopAddingAlertAction implements Action {
  readonly type = STOP_ADDING_ALERTS;

  constructor() {
  }
}

export class AddAlertAction implements Action {
  readonly type = ADD_ALERT;

  constructor(public payload: AlertModel) {
  }
}


export class GetAlertsAction implements Action {
  readonly type = GET_ALERTS;

  constructor() {
  }
}

export type AlertsActions = StartAddingAlertAction
  | AddAlertAction
  | StopAddingAlertAction
  | GetAlertsAction;
