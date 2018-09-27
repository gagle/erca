import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailComponent } from './components/container/detail/patient-detail.component';
import { PatientContainerComponent } from './components/container/patient-container.component';

const routes: Routes = [
  {
    path: 'patients',
    component: PatientContainerComponent,
    children: [{ path: ':patientId', component: PatientDetailComponent }]
  },
  { path: '**', redirectTo: '/patients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PatientsRoutingModule {}
