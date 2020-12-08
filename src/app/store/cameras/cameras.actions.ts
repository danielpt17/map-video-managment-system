import {Action} from '@ngrx/store';
import {CameraModel} from '../../modules/home/models/camera.model';

export const GET_CAMERAS = 'GET_CAMERAS';
export const SET_SELECTED_CAMERA = 'GET_CAMERA';
export const ADD_CAMERA = 'ADD_CAMERA';
export const TRY_ADD_CAMERA = 'TRY_ADD_CAMERA';
export const FAILED_ADD_CAMERA = 'FAILED_ADD_CAMERA';

export class TryAddCameraAction implements Action {
  readonly type = TRY_ADD_CAMERA;

  constructor(public payload: string) {
  }
}

export class FailedAddCameraAction implements Action {
  readonly type = FAILED_ADD_CAMERA;

  constructor() {
  }
}

export class AddCameraAction implements Action {
  readonly type = ADD_CAMERA;

  constructor(public payload: CameraModel) {
  }
}

export class SetSelectedCameraAction implements Action {
  readonly type = SET_SELECTED_CAMERA;

  constructor(public payload: CameraModel) {
  }
}

export class GetCamerasAction implements Action {
  readonly type = GET_CAMERAS;

  constructor() {
  }
}

export type CamerasActions = GetCamerasAction
  | AddCameraAction
  | SetSelectedCameraAction
  | TryAddCameraAction
  | FailedAddCameraAction;
