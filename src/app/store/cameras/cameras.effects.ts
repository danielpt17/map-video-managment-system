import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {EMPTY, of as observableOf} from 'rxjs';
import * as fromCamerasActions from './cameras.actions';
import {AddCameraAction, CamerasActions, FailedAddCameraAction} from './cameras.actions';
import {GeoLocationsService} from '../../modules/home/services/geolocations.service';
import * as fromAlertsActions from '../alerts/alerts.actions';
import {DescriptionEnum} from '../../modules/home/enums/description.enum';

@Injectable()
export class CamerasEffects {

  constructor(
    private actions$: Actions<CamerasActions>,
    private geoLocationService: GeoLocationsService
  ) {
  }

  @Effect()
  tryAddCamera = this.actions$
    .pipe(
      ofType(fromCamerasActions.TRY_ADD_CAMERA),
      switchMap((action: fromCamerasActions.TryAddCameraAction) => {
        return this.geoLocationService.getLongAndLatByAddress(action.payload);
      }),
      switchMap((results) => {
        if (results && results.length) {
          return observableOf(new AddCameraAction({lat: results[0].y, long: results[0].x, name: results[0].label}));
        } else {
          return observableOf(new FailedAddCameraAction());
        }
      })
    );
}
