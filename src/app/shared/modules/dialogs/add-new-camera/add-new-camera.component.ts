import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {HomeComponent} from '../../../../modules/home/home.component';

@Component({
  selector: 'app-new-camera-dialog',
  templateUrl: './add-new-camera.component.html',
  styleUrls: ['./add-new-camera.component.scss'],
})
export class AddNewCameraComponent implements OnInit {
  newCamera: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<HomeComponent>, private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.newCamera = this.fb.group({
      cameraName: new FormControl('', [
        Validators.required]
      )
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.newCamera.get('cameraName').value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
