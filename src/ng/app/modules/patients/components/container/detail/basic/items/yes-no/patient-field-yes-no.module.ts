import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material';
import { PatientFieldYesNoComponent } from './patient-field-yes-no.component';

@NgModule({
  imports: [CommonModule, MatButtonToggleModule],
  declarations: [PatientFieldYesNoComponent],
  exports: [PatientFieldYesNoComponent]
})
export class PatientFieldYesNoModule {}
