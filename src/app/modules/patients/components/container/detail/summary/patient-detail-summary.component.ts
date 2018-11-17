import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { assertNotNil } from '../../../../../../shared/assert/not-nil';
import { assertTruthy } from '../../../../../../shared/assert/truthy';
import { IllegalArgumentError } from '../../../../../../shared/errors/illegal-argument-error';
import { RequiredInputError } from '../../../../../../shared/errors/required-input-error';
import { Patient } from '../../../../models/patient.model';
import {
  PatientExportComponent,
  PatientExportDialogData
} from '../export/patient-export.component';

@Component({
  selector: 'app-patient-detail-summary',
  templateUrl: './patient-detail-summary.component.html',
  styleUrls: ['./patient-detail-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientDetailSummaryComponent implements OnChanges {
  @HostBinding('class.app-patient-detail-summary')
  public readonly hostClass = true;

  @Input()
  public patient!: Patient;

  public constructor(private readonly dialog: MatDialog) {}

  public ngOnChanges(changes: SimpleChanges): void {
    assertTruthy(
      changes.patient.currentValue,
      new RequiredInputError('Missing patient')
    );
  }

  public export(): void {
    assertNotNil(
      this.patient.id,
      new IllegalArgumentError(
        `Patient with record id '${
          this.patient.medicalRecordId
        }' must contain an id field`
      )
    );

    this.dialog
      .open<PatientExportComponent, PatientExportDialogData>(
        PatientExportComponent,
        {
          data: {
            patientId: this.patient.id!
          }
        }
      )
      .afterClosed()
      .subscribe();
  }
}
