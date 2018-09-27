import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { ErcaSvgIconModule } from '../svg-icon/svg-icon.module';
import { ErcaInputSearchComponent } from './input-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErcaSvgIconModule,
    MatButtonModule
  ],
  declarations: [ErcaInputSearchComponent],
  exports: [ErcaInputSearchComponent]
})
export class ErcaInputSearchModule {}
