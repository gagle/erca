import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material';
import { PatientFieldRadiologySurgerySelectorComponent } from './patient-field-radiology-surgery-selector.component';

@NgModule({
  imports: [MatButtonToggleModule],
  declarations: [PatientFieldRadiologySurgerySelectorComponent],
  exports: [PatientFieldRadiologySurgerySelectorComponent]
})
export class PatientFieldRadiologySurgerySelectorModule {}
