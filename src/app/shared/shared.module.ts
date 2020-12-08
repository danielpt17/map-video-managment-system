import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogModule} from './modules/dialogs/dialog.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [DialogModule],
})
export class SharedModule {
}
