import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ErcaInputSearchModule } from '../../../../../shared/input-search/input-search.module';
import { ErcaPagedListModule } from '../../../../../shared/paged-data-source/paged-list/paged-list.module';
import { PatientAddModule } from './add/patient-add.module';
import { PatientListItemModule } from './list-item/patient-list-item.module';
import { PatientListComponent } from './patient-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PatientListItemModule,
    PatientAddModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ErcaInputSearchModule,
    ErcaPagedListModule
  ],
  declarations: [PatientListComponent],
  exports: [PatientListComponent]
})
export class PatientListModule {}
