import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export abstract class PatientRepository {
  public abstract setup(): Promise<void>;
  public abstract getPatientById(id: string): Observable<Patient>;
  public abstract getPatients(
    page: number,
    size: number
  ): Observable<Patient[]>;
  public abstract getPatientsBySearch(
    page: number,
    size: number,
    terms: string
  ): Observable<Patient[]>;
  public abstract addPatient(patient: Patient): Observable<Patient>;
  public abstract updatePatient(patient: Patient): Observable<Patient>;
}
