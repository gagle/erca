import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { ErcaSnackBarModule } from '../../../../../../shared/snack-bar/snack-bar.module';
import { ErcaSvgIconModule } from '../../../../../../shared/svg-icon/svg-icon.module';
import { PatientExportComponent } from './patient-export.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ErcaSnackBarModule,
    ErcaSvgIconModule
  ],
  providers: [DatePipe],
  entryComponents: [PatientExportComponent],
  declarations: [PatientExportComponent],
  exports: [PatientExportComponent]
})
export class PatientExportModule {}
