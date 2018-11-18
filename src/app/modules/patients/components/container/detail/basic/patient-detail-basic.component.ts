import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { assertTruthy } from '../../../../../../shared/assert/truthy';
import { RequiredInputError } from '../../../../../../shared/errors/required-input-error';
import { SnackBarService } from '../../../../../../shared/snack-bar/snack-bar.service';
import { Patient } from '../../../../models/patient.model';
import { PatientRepository } from '../../../../services/repository/patient-repository.service';

@Component({
  selector: 'app-patient-detail-basic',
  templateUrl: './patient-detail-basic.component.html',
  styleUrls: ['./patient-detail-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientDetailBasicComponent implements OnChanges {
  @HostBinding('class.app-patient-detail-basic')
  readonly hostClass = true;

  @Input()
  patient!: Patient;

  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly snackBar: SnackBarService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    assertTruthy(
      changes.patient.currentValue,
      new RequiredInputError('Missing patient')
    );
  }

  updateCausaErc(value: string): void {
    this.patient = new Patient({ ...this.patient, causaErc: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateApetito(value: boolean): void {
    this.patient = new Patient({ ...this.patient, apetito: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updatePrurito(value: boolean): void {
    this.patient = new Patient({ ...this.patient, prurito: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateAmpa(value: string): void {
    this.patient = new Patient({ ...this.patient, ampa: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateEdemas(value: boolean): void {
    this.patient = new Patient({ ...this.patient, edemas: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateDiuresis(value: number): void {
    this.patient = new Patient({ ...this.patient, diuresis: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateSerologias(value: boolean): void {
    this.patient = new Patient({ ...this.patient, serologias: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateSerologiasDate(value: Date): void {
    this.patient = new Patient({ ...this.patient, serologiasDate: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateSerologiasNotes(value: string): void {
    this.patient = new Patient({ ...this.patient, serologiasNotes: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateEpo(value: boolean): void {
    this.patient = new Patient({ ...this.patient, epo: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateEpoNotes(value: string): void {
    this.patient = new Patient({ ...this.patient, epoNotes: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHvb(value: boolean): void {
    this.patient = new Patient({ ...this.patient, hvb: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHvbDate(value: Date): void {
    this.patient = new Patient({ ...this.patient, hvbDate: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHvbInmunidad(value: boolean): void {
    this.patient = new Patient({ ...this.patient, hvbInmunidad: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateFg(value: number): void {
    this.patient = new Patient({ ...this.patient, fg: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateFgDate(value: Date): void {
    this.patient = new Patient({ ...this.patient, fgDate: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateSituacionFamiliar(value: string): void {
    this.patient = new Patient({ ...this.patient, situacionFamiliar: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateCalidadVida(value: string): void {
    this.patient = new Patient({ ...this.patient, calidadVida: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateProcesoEducacion(value: boolean): void {
    this.patient = new Patient({ ...this.patient, procesoEducacion: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateConservador(value: boolean): void {
    this.patient = new Patient({ ...this.patient, conservador: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateConservadorNotes(value: string): void {
    this.patient = new Patient({ ...this.patient, conservadorNotes: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateTratamientoRenalSustitutivo(value: string): void {
    this.patient = new Patient({
      ...this.patient,
      tratamientoRenalSustitutivo: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateTrasplanteAnticipado(value: boolean): void {
    this.patient = new Patient({
      ...this.patient,
      trasplanteAnticipado: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateTrasplanteAnticipadoNotes(value: string): void {
    this.patient = new Patient({
      ...this.patient,
      trasplanteAnticipadoNotes: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateCateterPeritoneal(value: string): void {
    this.patient = new Patient({ ...this.patient, cateterPeritoneal: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHernias(value: boolean): void {
    this.patient = new Patient({ ...this.patient, hernias: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHerniasNotes(value: string): void {
    this.patient = new Patient({ ...this.patient, herniasNotes: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateDialisisCoagulacion(value: boolean): void {
    this.patient = new Patient({ ...this.patient, coagulacionDialisis: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateDialisisCoagulacionDate(value: Date): void {
    this.patient = new Patient({
      ...this.patient,
      coagulacionDialisisDate: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateDialisisCoagulacionNotes(value: string): void {
    this.patient = new Patient({
      ...this.patient,
      coagulacionDialisisNotes: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHemodialisisCoagulacion(value: boolean): void {
    this.patient = new Patient({
      ...this.patient,
      coagulacionHemodialisis: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHemodialisisCoagulacionDate(value: Date): void {
    this.patient = new Patient({
      ...this.patient,
      coagulacionHemodialisisDate: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateHemodialisisCoagulacionNotes(value: string): void {
    this.patient = new Patient({
      ...this.patient,
      coagulacionHemodialisisNotes: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateIngreso(value: Date): void {
    this.patient = new Patient({ ...this.patient, ingreso: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateMedicacionAnticoagulanteDialisis(value: boolean): void {
    this.patient = new Patient({
      ...this.patient,
      medicacionAnticoagulanteDialisis: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updatConsentimientoInformadoDialisis(value: boolean): void {
    this.patient = new Patient({
      ...this.patient,
      consentimientoInformadoDialisis: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateMapeoFavi(value: boolean): void {
    this.patient = new Patient({ ...this.patient, mapeoFavi: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateMapeoFaviDate(value: Date): void {
    this.patient = new Patient({ ...this.patient, mapeoFaviDate: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateMapeoFaviNotes(value: string): void {
    this.patient = new Patient({ ...this.patient, mapeoFaviNotes: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateFavi(value: boolean): void {
    this.patient = new Patient({ ...this.patient, favi: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateFaviDate(value: Date): void {
    this.patient = new Patient({ ...this.patient, faviDate: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateFaviNotes(value: string): void {
    this.patient = new Patient({ ...this.patient, faviNotes: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateCateterCentral(value: boolean): void {
    this.patient = new Patient({ ...this.patient, cateterCentral: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateCateterCentralDate(value: Date): void {
    this.patient = new Patient({ ...this.patient, cateterCentralDate: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateCateterCentralNotes(value: string): void {
    this.patient = new Patient({ ...this.patient, cateterCentralNotes: value });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateMedicacionAnticoagulanteHemodialisis(value: boolean): void {
    this.patient = new Patient({
      ...this.patient,
      medicacionAnticoagulanteHemodialisis: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updatConsentimientoInformadoHemodialisis(value: boolean): void {
    this.patient = new Patient({
      ...this.patient,
      consentimientoInformadoHemodialisis: value
    });
    this.patientRepository
      .updatePatient(this.patient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  private handleError(error: Error): void {
    this.snackBar.openError('No se puede actualizar el paciente');
    console.error(error);
  }
}
