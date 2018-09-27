export class Patient {
  public id?: string;
  public medicalRecordId!: string;
  public fullName!: string;
  public birthDate!: Date;
  public causaErc?: string;
  public apetito?: boolean;
  public prurito?: boolean;
  public ampa?: string;
  public edemas?: boolean;
  public diuresis?: number;
  public serologias?: boolean;
  public serologiasDate?: Date;
  public serologiasNotes?: string;
  public hvb?: boolean;
  public hvbDate?: Date;
  public epo?: boolean;
  public epoNotes?: string;
  public hvbInmunidad?: boolean;
  public fg?: number;
  public fgDate?: Date;
  public situacionFamiliar?: string;
  public calidadVida?: string;
  public procesoEducacion?: boolean;
  public conservador?: boolean;
  public conservadorNotes?: string;
  public tratamientoRenalSustitutivo?: string;
  public trasplanteAnticipado?: boolean;
  public trasplanteAnticipadoNotes?: string;
  public cateterPeritoneal?: string;
  public hernias?: boolean;
  public herniasNotes?: string;
  public coagulacionDialisis?: boolean;
  public coagulacionDialisisDate?: Date;
  public coagulacionDialisisNotes?: string;
  public coagulacionHemodialisis?: boolean;
  public coagulacionHemodialisisDate?: Date;
  public coagulacionHemodialisisNotes?: string;
  public ingreso?: Date;
  public medicacionAnticoagulanteDialisis?: boolean;
  public consentimientoInformadoDialisis?: boolean;
  public mapeoFavi?: boolean;
  public mapeoFaviDate?: Date;
  public mapeoFaviNotes?: string;
  public favi?: boolean;
  public faviDate?: Date;
  public faviNotes?: string;
  public cateterCentral?: boolean;
  public cateterCentralDate?: Date;
  public cateterCentralNotes?: string;
  public medicacionAnticoagulanteHemodialisis?: boolean;
  public consentimientoInformadoHemodialisis?: boolean;

  public constructor(properties?: Patient) {
    Object.assign(this, properties);
  }
}
