import {createSelector, createFeatureSelector} from '@ngrx/store';
import * as fromCamerasActions from './cameras.actions';
import {CameraModel} from '../../modules/home/models/camera.model';


export interface CamerasState {
  cameras: CameraModel[];
  selectedCamera: CameraModel;
}

export const initialState: CamerasState = {
  cameras: [{
    name: 'Maapilei Maroko 9',
    lat: 32.17579537720042,
    long: 34.853378499851345
  },
    {
      name: 'Seven Stars Mall',
      lat: 32.16467784713532,
      long: 34.82317554231411
    }, {
      name: 'Rami Levy',
      lat: 32.16692311980326,
      long: 34.84628464278967
    }],
  selectedCamera: {} as CameraModel,
};

export function camerasReducers(state: CamerasState = initialState, action: fromCamerasActions.CamerasActions): CamerasState {
  switch (action.type) {
    case fromCamerasActions.GET_CAMERAS:
      return {
        ...state,
      };
    case fromCamerasActions.FAILED_ADD_CAMERA:
      return {
        ...state,
      };
    case fromCamerasActions.ADD_CAMERA:
      return {
        ...state,
        cameras: [action.payload, ...state.cameras],
      };
    case fromCamerasActions.SET_SELECTED_CAMERA:
      return {
        ...state,
        selectedCamera: action.payload,
      };
    default:
      return state;
  }
}


export const featureKey = 'camerasState';
export const selectFeature = createFeatureSelector<CamerasState>(featureKey);
export const selectCamerasState = createSelector(selectFeature, (state: CamerasState) => {
  return state && state.cameras || [];
});
export const selectSelectedCameraState = createSelector(selectFeature, (state: CamerasState) => {
  return state && state.selectedCamera;
});
