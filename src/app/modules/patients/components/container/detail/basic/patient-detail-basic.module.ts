import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule } from '@angular/material';
import { ErcaSnackBarModule } from '../../../../../../shared/snack-bar/snack-bar.module';
import { PatientExportModule } from '../export/patient-export.module';
import { PatientFieldDateModule } from './items/date/patient-field-date.module';
import { PatientFieldNumberModule } from './items/number/patient-field-number.module';
import { PatientFieldTextModule } from './items/text/patient-field-text.module';
import { PatientFieldYesNoModule } from './items/yes-no/patient-field-yes-no.module';
import { PatientDetailBasicComponent } from './patient-detail-basic.component';
import { PatientFieldRadiologySurgerySelectorModule } from './radiology-surgery-selector/patient-field-radiology-surgery-selector.module';
import { PatientFieldTratamientoRenalSustitutivoSelectorModule } from './tratamiento-renal-sustitutivo-selector/patient-field-tratamiento-renal-sustitutivo-selector.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    PatientFieldYesNoModule,
    PatientFieldNumberModule,
    PatientFieldDateModule,
    PatientFieldTextModule,
    PatientFieldRadiologySurgerySelectorModule,
    PatientFieldTratamientoRenalSustitutivoSelectorModule,
    PatientExportModule,
    ErcaSnackBarModule
  ],
  declarations: [PatientDetailBasicComponent],
  exports: [PatientDetailBasicComponent]
})
export class PatientDetailBasicModule {}
