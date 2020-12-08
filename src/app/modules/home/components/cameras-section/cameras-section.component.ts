import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CameraModel} from '../../models/camera.model';


@Component({
  selector: 'app-cameras-section',
  templateUrl: './cameras-section.component.html',
  styleUrls: ['./cameras-section.component.scss'],
})
export class CamerasSectionComponent {
  @Output() selectedCamera: EventEmitter<CameraModel> = new EventEmitter();
  @Output() addCamera: EventEmitter<any> = new EventEmitter();
  @Input() cameras: CameraModel[];

  onAddNewCamera(): void {
    this.addCamera.emit();
  }

  onCameraClick(camera: CameraModel): void {
    this.selectedCamera.emit(camera);
  }
}
