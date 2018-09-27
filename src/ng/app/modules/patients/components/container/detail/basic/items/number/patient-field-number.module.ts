import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { PatientFieldNumberComponent } from './patient-field-number.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [PatientFieldNumberComponent],
  exports: [PatientFieldNumberComponent]
})
export class PatientFieldNumberModule {}
