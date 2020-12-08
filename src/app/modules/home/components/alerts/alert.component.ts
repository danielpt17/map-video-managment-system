import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertModel} from '../../models/alert.model';


@Component({
  selector: 'app-alerts',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() alerts: AlertModel[];
  @Output() selectedAlert: EventEmitter<AlertModel> = new EventEmitter();

  onSelectAlert(alert: AlertModel): void {
    this.selectedAlert.emit(alert);
  }

}
