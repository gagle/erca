import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PatientDetailModule } from './components/container/detail/patient-detail.module';
import { PatientListModule } from './components/container/list/patient-list.module';
import { PatientContainerModule } from './components/container/patient-container.module';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientRepository } from './services/repository/patient-repository.service';

export function initPatientRepository(
  patientRepository: PatientRepository
): () => Promise<void> {
  return async () => {
    await patientRepository.setup();
  };
}

@NgModule({
  providers: [
    {
      provide: PatientRepository,
      useClass: environment.patient.patientRepositoryType
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initPatientRepository,
      deps: [PatientRepository],
      multi: true
    }
  ],
  imports: [
    PatientsRoutingModule,
    PatientContainerModule,
    PatientListModule,
    PatientDetailModule
  ]
})
export class PatientsModule {}
