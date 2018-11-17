import { Component, HostBinding } from '@angular/core';
import { environment } from '../environments/environment';
import { PatientRepository } from './modules/patients/services/repository/patient-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.app-root')
  readonly hostClass = true;
  readonly isDevelopment = !environment.production;

  constructor(patientRepository: PatientRepository) {
    patientRepository.setup();
  }
}
