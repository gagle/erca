import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatListModule,
  MatRippleModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ErnaHighlightPipeModule } from '../../../../../../shared/highlight/highlight.module';
import { PatientListItemComponent } from './patient-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    MatDialogModule,
    MatListModule,
    ErnaHighlightPipeModule
  ],
  declarations: [PatientListItemComponent],
  exports: [PatientListItemComponent]
})
export class PatientListItemModule {}
