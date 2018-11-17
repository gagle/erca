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
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, causaErc: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateApetito(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, apetito: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updatePrurito(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, prurito: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateAmpa(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, ampa: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateEdemas(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, edemas: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateDiuresis(value: number): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, diuresis: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateSerologias(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, serologias: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateSerologiasDate(value: Date): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, serologiasDate: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateSerologiasNotes(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, serologiasNotes: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateEpo(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, epo: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateEpoNotes(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, epoNotes: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHvb(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, hvb: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHvbDate(value: Date): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, hvbDate: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHvbInmunidad(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, hvbInmunidad: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateFg(value: number): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, fg: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateFgDate(value: Date): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, fgDate: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateSituacionFamiliar(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, situacionFamiliar: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateCalidadVida(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, calidadVida: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateProcesoEducacion(value: boolean): void {
    const newPatient = new Patient({
      ...this.patient,
      procesoEducacion: value
    });
    this.patient = newPatient;
    this.patientRepository
      .updatePatient(newPatient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateConservador(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, conservador: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateConservadorNotes(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, conservadorNotes: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateTratamientoRenalSustitutivo(value: string): void {
    const newPatient = new Patient({
      ...this.patient,
      tratamientoRenalSustitutivo: value
    });
    this.patient = newPatient;
    this.patientRepository
      .updatePatient(newPatient)
      .subscribe(() => {}, error => this.handleError(error));
  }

  updateTrasplanteAnticipado(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, trasplanteAnticipado: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateTrasplanteAnticipadoNotes(value: string): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, trasplanteAnticipadoNotes: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateCateterPeritoneal(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, cateterPeritoneal: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHernias(value: boolean): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, hernias: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHerniasNotes(value: string): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, herniasNotes: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateDialisisCoagulacion(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, coagulacionDialisis: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateDialisisCoagulacionDate(value: Date): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, coagulacionDialisisDate: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateDialisisCoagulacionNotes(value: string): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, coagulacionDialisisNotes: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHemodialisisCoagulacion(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, coagulacionHemodialisis: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHemodialisisCoagulacionDate(value: Date): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, coagulacionHemodialisisDate: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateHemodialisisCoagulacionNotes(value: string): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, coagulacionHemodialisisNotes: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateIngreso(value: Date): void {
    this.patientRepository
      .updatePatient(new Patient({ ...this.patient, ingreso: value }))
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateMedicacionAnticoagulanteDialisis(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          medicacionAnticoagulanteDialisis: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updatConsentimientoInformadoDialisis(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({ ...this.patient, consentimientoInformadoDialisis: value })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateMapeoFavi(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          mapeoFavi: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateMapeoFaviDate(value: Date): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          mapeoFaviDate: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateMapeoFaviNotes(value: string): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          mapeoFaviNotes: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateFavi(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          favi: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateFaviDate(value: Date): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          faviDate: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateFaviNotes(value: string): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          faviNotes: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateCateterCentral(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          cateterCentral: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateCateterCentralDate(value: Date): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          cateterCentralDate: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateCateterCentralNotes(value: string): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          cateterCentralNotes: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updateMedicacionAnticoagulanteHemodialisis(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          medicacionAnticoagulanteHemodialisis: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  updatConsentimientoInformadoHemodialisis(value: boolean): void {
    this.patientRepository
      .updatePatient(
        new Patient({
          ...this.patient,
          consentimientoInformadoHemodialisis: value
        })
      )
      .subscribe(
        patient => {
          this.patient = patient;
        },
        error => this.handleError(error)
      );
  }

  private handleError(error: Error): void {
    this.snackBar.openError('No se puede actualizar el paciente');
    console.error(error);
  }
}
