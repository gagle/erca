import { Injectable } from '@angular/core';
import { readJson, writeJson } from 'fs-extra';
import { from, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { Patient } from '../../../models/patient.model';
import { PatientError } from '../../../patient-error';
import { PatientRepository } from '../patient-repository.service';

interface StorageFile {
  patients: Patient[];
}

@Injectable()
export class FsPatientRepository implements PatientRepository {
  private readonly fileName = 'patients.json';
  private patients: Patient[] = [];

  async setup(): Promise<void> {
    try {
      const fileContent: StorageFile = await readJson(this.fileName);

      this.patients = fileContent.patients.map(
        storedPatient =>
          new Patient({
            ...storedPatient
          })
      );
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(error);
      }
    }
  }

  getPatientById(id: string): Observable<Patient> {
    const patientFound = this.patients.find(patient => patient.id === id);
    return patientFound
      ? of(patientFound)
      : throwError(new PatientError(`Patient id '${id}' not found`));
  }

  getPatients(page: number, size: number): Observable<Patient[]> {
    const offset = (page - 1) * size;
    return of(this.patients.slice(offset, offset + size));
  }

  getPatientsBySearch(
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

  addPatient(patient: Patient): Observable<Patient> {
    const newPatient = new Patient({
      ...patient,
      id: uuid()
    });
    this.patients = [...this.patients, newPatient];
    return from(this.updateFile()).pipe(map(() => newPatient));
  }

  updatePatient(patient: Patient): Observable<Patient> {
    console.log(patient);
    const index = this.patients.findIndex(
      innerPatient => innerPatient.id === patient.id
    );

    if (index === -1) {
      return this.addPatient(patient);
    } else {
      const patients = [...this.patients];
      patients.splice(index, 1, patient);
      this.patients = patients;
      return from(this.updateFile()).pipe(map(() => patient));
    }
  }

  private updateFile(): Promise<void> {
    return writeJson(this.fileName, {
      patients: this.patients
    });
  }
}
