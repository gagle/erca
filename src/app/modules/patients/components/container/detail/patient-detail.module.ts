import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatientDetailBasicModule } from './basic/patient-detail-basic.module';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientDetailSummaryModule } from './summary/patient-detail-summary.module';

@NgModule({
  imports: [CommonModule, PatientDetailSummaryModule, PatientDetailBasicModule],
  declarations: [PatientDetailComponent],
  exports: [PatientDetailComponent]
})
export class PatientDetailModule {}
