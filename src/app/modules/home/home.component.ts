import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CameraModel} from './models/camera.model';
import {MatDialog} from '@angular/material/dialog';
import {AddNewCameraComponent} from '../../shared/modules/dialogs/add-new-camera/add-new-camera.component';
import {AlertModel} from './models/alert.model';
import * as _ from 'lodash';
import {DescriptionEnum} from './enums/description.enum';
import {Subscription} from 'rxjs';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {CamerasState, selectCamerasState, selectSelectedCameraState} from '../../store/cameras/cameras.reducers';
import {FAILED_ADD_CAMERA, SetSelectedCameraAction, TryAddCameraAction} from '../../store/cameras/cameras.actions';
import {AlertsState, selectAlertsState} from '../../store/alerts/alerts.reducers';
import {StartAddingAlertAction, StopAddingAlertAction} from '../../store/alerts/alerts.actions';
import {ofType} from '@ngrx/effects';
import {ToastrService} from 'ngx-toastr';
import {HomeService} from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  cameras: CameraModel[];
  selectedCamera: CameraModel;
  alerts: AlertModel[];
  subs: Subscription = new Subscription();
  shouldFocusOnSelectedCamera = false;
  FAILED_ADDING_CAMERA_ERROR_MESSAGE = 'Failed to add camera, please try again.';

  constructor(private readonly store: Store<{ cameras: CamerasState, alerts: AlertsState }>,
              private readonly cdr: ChangeDetectorRef,
              private readonly homeService: HomeService,
              private readonly actionsSubj: ActionsSubject,
              private readonly toastr: ToastrService,
              private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.subscribeToCamerasState();
    this.subscribeToAlertsState();
    this.subscribeToSelectedCamera();
    this.subscribeToAddingCameraErrors();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  private subscribeToSelectedCamera(): void {
    this.subs.add(this.store.pipe(
      select(
        selectSelectedCameraState
      )
    ).subscribe((camera: CameraModel) => {
      if (_.values(camera).some(x => x !== undefined)) {
        this.selectedCamera = camera;
        this.cdr.detectChanges();
      }
    }));
  }

  private subscribeToAddingCameraErrors(): void {
    this.subs.add(this.actionsSubj.pipe(
      ofType(FAILED_ADD_CAMERA)
    ).subscribe(() => {
      this.toastr.error(this.FAILED_ADDING_CAMERA_ERROR_MESSAGE);
    }));
  }

  private subscribeToCamerasState(): void {
    this.subs.add(this.store.pipe(
      select(
        selectCamerasState
      )
    ).subscribe((cameras: CameraModel[]) => {
      this.cameras = cameras;
      this.cdr.detectChanges();
    }));
  }

  private subscribeToAlertsState(): void {
    this.subs.add(this.store.pipe(
      select(
        selectAlertsState
      )
    ).subscribe((alerts: AlertModel[]) => {
      if (alerts.length > 0) {
        this.alerts = alerts;
        this.cdr.detectChanges();
      }
    }));
  }

  onSelectedAlert(alert: AlertModel): void {
    this.homeService.setFocusSubject(true);
  }

  onSelectedCamera(camera: CameraModel): void {
    if (this.selectedCamera && this.selectedCamera.name === camera.name) {
      return;
    }
    if (this.alerts && this.alerts.length > 0) {
      this.store.dispatch(new StopAddingAlertAction());
    }
    this.store.dispatch(new SetSelectedCameraAction(camera));
    this.store.dispatch(new StartAddingAlertAction(
      {
        time: new Date().toLocaleString(),
        description: _.sample(Object.values(DescriptionEnum)) as DescriptionEnum,
        geolocation: {lat: this.selectedCamera.lat, long: this.selectedCamera.long}
      }
    ));
  }

  onAddNewCamera(): void {
    const dialogRef = this.dialog.open(AddNewCameraComponent, {
      width: '450px',
      height: '200px',
    });
    dialogRef.afterClosed().subscribe(cameraLocationAddress => {
      if (cameraLocationAddress.length) {
        this.store.dispatch(new TryAddCameraAction(cameraLocationAddress));
      }
    });
  }

}
