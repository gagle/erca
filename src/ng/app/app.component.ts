import { Component, HostBinding } from '@angular/core';
import { PatientRepository } from './modules/patients/services/repository/patient-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.app-root')
  public readonly hostClass = true;

  public constructor(patientRepository: PatientRepository) {
    patientRepository.setup();
  }
}
