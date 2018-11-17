import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PatientListModule } from './list/patient-list.module';
import { PatientContainerComponent } from './patient-container.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatSidenavModule, PatientListModule],
  declarations: [PatientContainerComponent],
  exports: [PatientContainerComponent]
})
export class PatientContainerModule {}
