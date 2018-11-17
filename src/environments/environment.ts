import 'zone.js/dist/zone-error';
import { FsPatientRepository } from '../app/modules/patients/services/repository/fs/fs-patient-repository.service';

export const environment = {
  production: false,
  patient: {
    patientRepositoryType: FsPatientRepository
  }
};
