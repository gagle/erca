import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Patient } from '../../../models/patient.model';
import { PatientError } from '../../../patient-error';
import { PatientRepository } from '../patient-repository.service';

@Injectable()
export class InMemoryPatientRepository implements PatientRepository {
  private patients: Patient[] = [
    new Patient({
      id: '1',
      medicalRecordId: '1',
      fullName: 'Gabriel Llamas',
      birthDate: new Date(),
      causaErc: 'foo',
      apetito: true,
      prurito: true,
      ampa: 'foo',
      edemas: false,
      diuresis: 1234,
      serologias: true,
      serologiasDate: new Date(),
      serologiasNotes: 'foo',
      hvb: true,
      hvbDate: new Date(),
      hvbInmunidad: false,
      epo: false,
      epoNotes: 'foo',
      fg: 12,
      fgDate: new Date(),
      situacionFamiliar: 'foo',
      calidadVida: 'foo',
      procesoEducacion: true,
      conservador: false,
      conservadorNotes: 'foo',
      trasplanteAnticipado: true,
      trasplanteAnticipadoNotes: 'foo',
      tratamientoRenalSustitutivo: 'dialisisPeritoneal',
      cateterPeritoneal: 'radiology',
      hernias: true,
      herniasNotes: 'foo',
      coagulacionDialisis: true,
      coagulacionDialisisDate: new Date(),
      coagulacionDialisisNotes: 'foo',
      coagulacionHemodialisis: true,
      coagulacionHemodialisisDate: new Date(),
      coagulacionHemodialisisNotes: 'foo',
      ingreso: new Date(),
      medicacionAnticoagulanteDialisis: true,
      consentimientoInformadoDialisis: false,
      mapeoFavi: true,
      mapeoFaviDate: new Date(),
      mapeoFaviNotes: 'foo',
      favi: false,
      faviDate: new Date(),
      faviNotes: 'foo',
      cateterCentral: true,
      cateterCentralDate: new Date(),
      cateterCentralNotes: 'foo',
      medicacionAnticoagulanteHemodialisis: true,
      consentimientoInformadoHemodialisis: false
    }),
    new Patient({
      id: '2',
      medicalRecordId: '2',
      fullName: 'Marcela Castillo',
      birthDate: new Date()
    })
  ];

  public async setup(): Promise<void> {}

  public getPatientById(id: string): Observable<Patient> {
    const patientFound = this.patients.find(patient => patient.id === id);
    return patientFound
      ? of(patientFound)
      : throwError(new PatientError(`Patient id '${id}' not found`));
  }

  public getPatients(page: number, size: number): Observable<Patient[]> {
    const offset = (page - 1) * size;
    return of(this.patients.slice(offset, offset + size));
  }

  public getPatientsBySearch(
    page: number,
    size: number,
    terms: string
  ): Observable<Patient[]> {
    terms = terms.toLowerCase();
    const offset = (page - 1) * size;
    return of(
      this.patients
        .slice(offset, offset + size)
        .filter(
          patient =>
            patient.fullName.toLowerCase().includes(terms) ||
            patient.medicalRecordId.toLowerCase().includes(terms)
        )
    );
  }

  public addPatient(patient: Patient): Observable<Patient> {
    const newPatient = new Patient({
      ...patient,
      id: uuid()
    });
    this.patients = [...this.patients, newPatient];
    return of(newPatient);
  }

  public updatePatient(patient: Patient): Observable<Patient> {
    const index = this.patients.findIndex(
      innerPatient => innerPatient.id === patient.id
    );

    if (index === -1) {
      console.log('entra');
      return this.addPatient(patient);
    } else {
      console.log('ok');
      const patients = [...this.patients];
      patients.splice(index, 0, patient);
      this.patients = patients;
      return of(patient);
    }
  }
}
