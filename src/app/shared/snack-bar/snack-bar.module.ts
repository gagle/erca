import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { ErcaSvgIconModule } from '../svg-icon/svg-icon.module';
import { ErcaSnackBarComponent } from './snack-bar.component';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, ErcaSvgIconModule],
  entryComponents: [ErcaSnackBarComponent],
  declarations: [ErcaSnackBarComponent],
  exports: [ErcaSnackBarComponent]
})
export class ErcaSnackBarModule {}
