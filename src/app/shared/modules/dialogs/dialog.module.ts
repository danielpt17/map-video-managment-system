import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddNewCameraComponent} from './add-new-camera/add-new-camera.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AddNewCameraComponent
  ],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  providers: [],
  exports: [AddNewCameraComponent],


})
export class DialogModule {

}
