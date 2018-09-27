import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ErcaSvgIconModule } from '../../../../../../../../shared/svg-icon/svg-icon.module';
import { PatientFieldTextComponent } from './patient-field-text.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErcaSvgIconModule
  ],
  declarations: [PatientFieldTextComponent],
  exports: [PatientFieldTextComponent]
})
export class PatientFieldTextModule {}
