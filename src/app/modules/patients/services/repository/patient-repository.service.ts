import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export abstract class PatientRepository {
  abstract setup(): Promise<void>;
  abstract getPatientById(id: string): Observable<Patient>;
  abstract getPatients(page: number, size: number): Observable<Patient[]>;
  abstract getPatientsBySearch(
    page: number,
    size: number,
    terms: string
  ): Observable<Patient[]>;
  abstract addPatient(patient: Patient): Observable<Patient>;
  abstract updatePatient(patient: Patient): Observable<Patient>;
}
