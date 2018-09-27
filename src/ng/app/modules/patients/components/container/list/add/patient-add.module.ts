import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { ErcaSnackBarModule } from '../../../../../../shared/snack-bar/snack-bar.module';
import { PatientAddComponent } from './patient-add.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ErcaSnackBarModule
  ],
  entryComponents: [PatientAddComponent],
  declarations: [PatientAddComponent],
  exports: [PatientAddComponent]
})
export class PatientAddModule {}
