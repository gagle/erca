import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import {
  PagedDataSource,
  PageEvent
} from '../../../shared/paged-data-source/paged-data-source';
import { Patient } from '../models/patient.model';
import { PatientRepository } from './repository/patient-repository.service';

export interface PatientListFilter {
  search: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientStore {
  private readonly patientListPageSize = 100;

  private readonly patientSource: PagedDataSource<Patient, PatientListFilter>;
  private readonly patient$ = new ReplaySubject<Patient>(1);

  constructor(private patientRepository: PatientRepository) {
    this.patientSource = new PagedDataSource<Patient, PatientListFilter>({
      pageSize: this.patientListPageSize,
      fetch: this.getPatients.bind(this)
    });
  }

  getPatientSource(): PagedDataSource<Patient, PatientListFilter> {
    return this.patientSource;
  }

  onPatient(): Observable<Patient> {
    return this.patient$.asObservable();
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.patientRepository
      .addPatient(patient)
      .pipe(tap(() => this.patientSource.refresh()));
  }

  findPatientById(id: string): Observable<Patient> {
    const patient$ = this.patientRepository
      .getPatientById(id)
      .pipe(shareReplay(1));

    patient$.subscribe(patient => this.patient$.next(patient));

    return patient$;
  }

  private getPatients(
    page: PageEvent,
    listFilter: PatientListFilter
  ): Observable<Patient[]> {
    return listFilter.search
      ? this.patientRepository.getPatientsBySearch(
          page.page,
          page.size,
          listFilter.search
        )
      : this.patientRepository.getPatients(page.page, page.size);
  }
}
