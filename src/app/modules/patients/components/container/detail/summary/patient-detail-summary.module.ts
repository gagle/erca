import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { ErcaTextFieldModule } from '../../../../../../shared/text-field/text-field.module';
import { PatientDetailSummaryComponent } from './patient-detail-summary.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, ErcaTextFieldModule],
  declarations: [PatientDetailSummaryComponent],
  exports: [PatientDetailSummaryComponent]
})
export class PatientDetailSummaryModule {}
