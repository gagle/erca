import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material';
import { PatientFieldTratamientoRenalSustitutivoSelectorComponent } from './patient-field-tratamiento-renal-sustitutivo-selector.component';

@NgModule({
  imports: [MatButtonToggleModule],
  declarations: [PatientFieldTratamientoRenalSustitutivoSelectorComponent],
  exports: [PatientFieldTratamientoRenalSustitutivoSelectorComponent]
})
export class PatientFieldTratamientoRenalSustitutivoSelectorModule {}
