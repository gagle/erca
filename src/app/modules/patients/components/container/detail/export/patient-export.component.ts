import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CONTENT_COPY } from '../../../../../../icons';
import { SnackBarService } from '../../../../../../shared/snack-bar/snack-bar.service';
import { Patient } from '../../../../models/patient.model';
import { PatientRepository } from '../../../../services/repository/patient-repository.service';
import { TextReportService } from './text-report.service';

export interface PatientExportDialogData {
  patientId: string;
}

@Component({
  selector: 'app-patient-export',
  templateUrl: './patient-export.component.html',
  styleUrls: ['./patient-export.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientExportComponent implements OnInit, AfterViewInit {
  @HostBinding('class.app-patient-export')
  readonly hostClass = true;

  @ViewChild('textarea')
  readonly textarea!: ElementRef<HTMLTextAreaElement>;

  readonly CONTENT_COPY = CONTENT_COPY;
  patient$!: Observable<Patient>;

  private readonly patientId = this.dialogData.patientId;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly dialogData: PatientExportDialogData,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly patientRepository: PatientRepository,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly snackBar: SnackBarService,
    private readonly patientReport: TextReportService
  ) {}

  ngOnInit(): void {
    this.patient$ = this.patientRepository.getPatientById(this.patientId);
  }

  ngAfterViewInit(): void {
    this.copyIntoClipboard();
    this.changeDetector.detach();
  }

  copyIntoClipboard(openSnackBar?: boolean): void {
    this.textarea.nativeElement.select();
    this.document.execCommand('copy');
    this.textarea.nativeElement.setSelectionRange(0, 0);

    if (openSnackBar) {
      this.snackBar.openSuccess('Texto copiado en el portapapeles!');
    }
  }

  createPatientReport(patient: Patient): string {
    return this.patientReport.create(patient);
  }
}
