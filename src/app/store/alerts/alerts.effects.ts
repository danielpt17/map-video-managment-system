import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, takeUntil} from 'rxjs/operators';
import * as fromAlertsActions from './alerts.actions';
import {AlertsActions} from './alerts.actions';
import {of as observableOf, timer} from 'rxjs';
import {DescriptionEnum} from '../../modules/home/enums/description.enum';
import * as _ from 'lodash';

@Injectable()
export class AlertsEffects {

  constructor(
    private actions$: Actions<AlertsActions>,
  ) {
  }

  @Effect()
  startAddingAlerts = this.actions$
    .pipe(
      ofType(fromAlertsActions.START_ADDING_ALERTS),
      switchMap((action: fromAlertsActions.StartAddingAlertAction) => {
          return timer(0, 10000)
            .pipe(
              switchMap(() => {
                return observableOf(new fromAlertsActions.AddAlertAction({
                  time: new Date().toLocaleString(),
                  description: _.sample(Object.values(DescriptionEnum)) as DescriptionEnum,
                  geolocation: {lat: action.payload.geolocation.lat, long: action.payload.geolocation.long}
                }));
              }),
              takeUntil(this.actions$.pipe(ofType(fromAlertsActions.STOP_ADDING_ALERTS)))
            );
        }
      )
    );
}
