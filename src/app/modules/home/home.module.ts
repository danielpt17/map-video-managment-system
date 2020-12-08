import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {CommonModule} from '@angular/common';
import {MapComponent} from './components/map/map.component';
import {CamerasSectionComponent} from './components/cameras-section/cameras-section.component';
import {SharedModule} from '../../shared/shared.module';
import {GeoLocationsService} from './services/geolocations.service';
import {AlertComponent} from './components/alerts/alert.component';
import {StoreModule} from '@ngrx/store';
import * as fromCamerasReducers from '../../store/cameras/cameras.reducers';
import * as fromAlertsReducers from '../../store/alerts/alerts.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AlertsEffects} from '../../store/alerts/alerts.effects';
import {CamerasEffects} from '../../store/cameras/cameras.effects';
import {HomeService} from './services/home.service';

@NgModule({
  declarations: [
    HomeComponent,
    AlertComponent,
    MapComponent,
    CamerasSectionComponent,
  ],
  providers: [GeoLocationsService, HomeService],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature('camerasState', fromCamerasReducers.camerasReducers),
    StoreModule.forFeature('alertsState', fromAlertsReducers.alertsReducers),
    EffectsModule.forFeature([AlertsEffects]),
    EffectsModule.forFeature([CamerasEffects]),
  ],
  exports: []
})
export class HomeModule {
}
