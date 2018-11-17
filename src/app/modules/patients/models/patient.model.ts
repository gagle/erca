export class Patient {
  id?: string;
  medicalRecordId!: string;
  fullName!: string;
  birthDate!: Date;
  causaErc?: string;
  apetito?: boolean;
  prurito?: boolean;
  ampa?: string;
  edemas?: boolean;
  diuresis?: number;
  serologias?: boolean;
  serologiasDate?: Date;
  serologiasNotes?: string;
  hvb?: boolean;
  hvbDate?: Date;
  epo?: boolean;
  epoNotes?: string;
  hvbInmunidad?: boolean;
  fg?: number;
  fgDate?: Date;
  situacionFamiliar?: string;
  calidadVida?: string;
  procesoEducacion?: boolean;
  conservador?: boolean;
  conservadorNotes?: string;
  tratamientoRenalSustitutivo?: string;
  trasplanteAnticipado?: boolean;
  trasplanteAnticipadoNotes?: string;
  cateterPeritoneal?: string;
  hernias?: boolean;
  herniasNotes?: string;
  coagulacionDialisis?: boolean;
  coagulacionDialisisDate?: Date;
  coagulacionDialisisNotes?: string;
  coagulacionHemodialisis?: boolean;
  coagulacionHemodialisisDate?: Date;
  coagulacionHemodialisisNotes?: string;
  ingreso?: Date;
  medicacionAnticoagulanteDialisis?: boolean;
  consentimientoInformadoDialisis?: boolean;
  mapeoFavi?: boolean;
  mapeoFaviDate?: Date;
  mapeoFaviNotes?: string;
  favi?: boolean;
  faviDate?: Date;
  faviNotes?: string;
  cateterCentral?: boolean;
  cateterCentralDate?: Date;
  cateterCentralNotes?: string;
  medicacionAnticoagulanteHemodialisis?: boolean;
  consentimientoInformadoHemodialisis?: boolean;

  constructor(properties?: Patient) {
    Object.assign(this, properties);
  }
}
