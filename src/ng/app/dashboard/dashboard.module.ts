import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsModule } from '../modules/patients/patients.module';
import { DashboardComponent } from './dashboard.component';
import { ToolBarModule } from './tool-bar/tool-bar.module';

@NgModule({
  imports: [RouterModule, ToolBarModule, PatientsModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
