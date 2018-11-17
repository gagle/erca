import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { isNil } from '../../../../../../shared/is-nil';
import { Patient } from '../../../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class TextReportService {
  private readonly dateFormat = 'dd/MM/yyyy';

  constructor(private datePipe: DatePipe) {}

  create(patient: Patient): string {
    const report = `${this.createPatientSummary(patient)}

${this.createBasicInformation(patient)}

${this.createProcesoEducacion(patient)}`;

    return report;
  }

  private createPatientSummary(patient: Patient): string {
    return `Paciente:
${patient.fullName}, ${patient.medicalRecordId}, ${this.datePipe.transform(
      patient.birthDate,
      this.dateFormat
    ) || ''}`;
  }

  private createBasicInformation(patient: Patient): string {
    return `Causa de ERC: ${this.join(patient.causaErc)}
Situación familiar/social: ${this.join(patient.situacionFamiliar)}
Calidad de vida: ${this.join(patient.calidadVida)}
Apetito: ${this.join(
      isNil(patient.apetito) ? '' : patient.apetito ? 'sí' : 'no'
    )}
Prurito: ${this.join(
      isNil(patient.prurito) ? '' : patient.prurito ? 'sí' : 'no'
    )}
Edemas: ${this.join(isNil(patient.edemas) ? '' : patient.edemas ? 'sí' : 'no')}
AMPA: ${this.join(patient.ampa)}
Diuresis: ${this.join(!isNil(patient.diuresis) ? `${patient.diuresis} ml` : '')}
FG: ${this.join(
      patient.fg,
      this.datePipe.transform(patient.fgDate, this.dateFormat)
    )}
Serologías: ${this.join(
      isNil(patient.serologias) ? '' : patient.serologias ? 'sí' : 'no',
      this.datePipe.transform(patient.serologiasDate, this.dateFormat),
      patient.serologiasNotes
    )}
Vacuna HVB: ${this.join(
      isNil(patient.hvb) ? '' : patient.hvb ? 'sí' : 'no',
      this.datePipe.transform(patient.hvbDate, this.dateFormat)
    )}
    Inmunidad: ${this.join(
      isNil(patient.hvbInmunidad) ? '' : patient.hvbInmunidad ? 'sí' : 'no'
    )}
EPO: ${this.join(
      isNil(patient.epo) ? '' : patient.epo ? 'sí' : 'no',
      patient.epoNotes
    )}`;
  }

  private createProcesoEducacion(patient: Patient): string {
    let report = `Proceso educación: ${this.join(
      isNil(patient.procesoEducacion)
        ? ''
        : patient.procesoEducacion
        ? 'sí'
        : 'no'
    )}`;

    if (patient.procesoEducacion) {
      report = `${report}

Conservador: ${this.join(
        isNil(patient.conservador) ? '' : patient.conservador ? 'sí' : 'no',
        patient.conservadorNotes
      )}
Trasplante anticipado: ${this.join(
        isNil(patient.trasplanteAnticipado)
          ? ''
          : patient.trasplanteAnticipado
          ? 'sí'
          : 'no',
        patient.trasplanteAnticipadoNotes
      )}`;

      if (patient.tratamientoRenalSustitutivo === 'dialisisPeritoneal') {
        report = `${report}

${this.createDialisisPeritoneal(patient)}`;
      } else if (patient.tratamientoRenalSustitutivo === 'hemodialisis') {
        report = `${report}

${this.createHemodialisis(patient)}`;
      }
    }

    return report;
  }

  private createDialisisPeritoneal(patient: Patient): string {
    return `Diálisis peritoneal:

Hérnias: ${this.join(
      isNil(patient.hernias) ? '' : patient.hernias ? 'sí' : 'no',
      patient.herniasNotes
    )}
Catéter peritoneal: ${this.join(patient.cateterPeritoneal)}
Coagulación: ${this.join(
      isNil(patient.coagulacionDialisis)
        ? ''
        : patient.coagulacionDialisis
        ? 'sí'
        : 'no',
      this.datePipe.transform(patient.coagulacionDialisisDate, this.dateFormat),
      patient.coagulacionDialisisNotes
    )}
Medicación anticoagulante: ${this.join(
      isNil(patient.medicacionAnticoagulanteDialisis)
        ? ''
        : patient.medicacionAnticoagulanteDialisis
        ? 'sí'
        : 'no'
    )}
Ingreso: ${this.join(this.datePipe.transform(patient.ingreso, this.dateFormat))}
Consentimiento informado: ${this.join(
      isNil(patient.consentimientoInformadoDialisis)
        ? ''
        : patient.consentimientoInformadoDialisis
        ? 'sí'
        : 'no'
    )}`;
  }

  private createHemodialisis(patient: Patient): string {
    return `Hemodiálisis:

Mapeo FAVI: ${this.join(
      isNil(patient.mapeoFavi) ? '' : patient.mapeoFavi ? 'sí' : 'no',
      this.datePipe.transform(patient.mapeoFaviDate, this.dateFormat),
      patient.mapeoFaviNotes
    )}
FAVI: ${this.join(
      isNil(patient.favi) ? '' : patient.favi ? 'sí' : 'no',
      this.datePipe.transform(patient.faviDate, this.dateFormat),
      patient.faviNotes
    )}
Catéter central: ${this.join(
      isNil(patient.cateterCentral) ? '' : patient.cateterCentral ? 'sí' : 'no',
      this.datePipe.transform(patient.cateterCentralDate, this.dateFormat),
      patient.cateterCentralNotes
    )}
Coagulación: ${this.join(
      isNil(patient.coagulacionDialisis)
        ? ''
        : patient.coagulacionDialisis
        ? 'sí'
        : 'no',
      this.datePipe.transform(patient.coagulacionDialisisDate, this.dateFormat),
      patient.coagulacionDialisisNotes
    )}
Medicación anticoagulante: ${this.join(
      isNil(patient.medicacionAnticoagulanteHemodialisis)
        ? ''
        : patient.medicacionAnticoagulanteHemodialisis
        ? 'sí'
        : 'no'
    )}
Consentimiento informado: ${this.join(
      isNil(patient.consentimientoInformadoHemodialisis)
        ? ''
        : patient.consentimientoInformadoHemodialisis
        ? 'sí'
        : 'no'
    )}`;
  }

  private join(...values: any[]): string {
    return values.filter(value => !isNil(value)).join(', ');
  }
}
