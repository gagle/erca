import { FsPatientRepository } from '../app/modules/patients/services/repository/fs/fs-patient-repository.service';

export const environment = {
  production: true,
  patient: {
    patientRepositoryType: FsPatientRepository
  }
};
