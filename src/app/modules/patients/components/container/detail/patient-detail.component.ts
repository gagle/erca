import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Patient } from '../../../models/patient.model';
import { PatientStore } from '../../../services/patient-store.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  @HostBinding('class.app-patient-detail')
  readonly hostClass = true;

  patient$!: Observable<Patient>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientStore: PatientStore
  ) {}

  ngOnInit(): void {
    this.patient$ = this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map(params => params.get('patientId')!),
      switchMap(patientId => this.patientStore.findPatientById(patientId))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
