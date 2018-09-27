import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErcaSvgIconModule } from '../svg-icon/svg-icon.module';
import { ErcaToolBarItemDirective } from './tool-bar-item.directive';
import { ErcaToolBarComponent } from './tool-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ErcaSvgIconModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule
  ],
  declarations: [ErcaToolBarComponent, ErcaToolBarItemDirective],
  exports: [ErcaToolBarComponent, ErcaToolBarItemDirective]
})
export class ErcaToolBarModule {}
