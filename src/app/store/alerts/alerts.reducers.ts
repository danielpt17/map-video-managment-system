import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAlertsActions from './alerts.actions';
import {AlertModel} from '../../modules/home/models/alert.model';


export interface AlertsState {
  alerts: AlertModel[];
}

export const initialState: AlertsState = {
  alerts: []
};

export function alertsReducers(state: AlertsState = initialState, action: fromAlertsActions.AlertsActions): AlertsState {
  switch (action.type) {
    case fromAlertsActions.GET_ALERTS:
      return {
        ...state,
      };
    case fromAlertsActions.ADD_ALERT:
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
      };
    case fromAlertsActions.STOP_ADDING_ALERTS:
      return {
        ...state,
        alerts: []
      };
    default:
      return state;
  }
}


export const featureKey = 'alertsState';
export const selectFeature = createFeatureSelector<AlertsState>(featureKey);
export const selectAlertsState = createSelector(selectFeature, (state: AlertsState) => state && state.alerts || []);

