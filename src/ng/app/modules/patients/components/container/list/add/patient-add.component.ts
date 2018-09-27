import {
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker, MatDialogRef } from '@angular/material';
import { DialogResult } from '../../../../../../shared/dialog-result';
import { EventLoop } from '../../../../../../shared/event-loop';
import { SnackBarService } from '../../../../../../shared/snack-bar/snack-bar.service';
import { Patient } from '../../../../models/patient.model';
import { PatientStore } from '../../../../services/patient-store.service';

export interface PatientAddConfirmationDialogData {
  patient: Patient;
}

interface PatientAddForm {
  fullName: string;
  medicalRecordId: string;
  birthDate: Date;
}

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientAddComponent {
  @HostBinding('class.app-patient-add')
  public readonly hostClass = true;

  @ViewChild('birthDateInput')
  public readonly birthDateInput!: ElementRef;

  public awaitingResponse = false;

  public readonly patientForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    medicalRecordId: ['', [Validators.required]],
    birthDate: ['', [Validators.required]]
  });

  public constructor(
    private readonly dialogRef: MatDialogRef<
      PatientAddComponent,
      DialogResult<Patient>
    >,
    private readonly patientStore: PatientStore,
    private readonly snackBar: SnackBarService,
    private readonly formBuilder: FormBuilder,
    private readonly eventLoop: EventLoop
  ) {}

  public close(result?: DialogResult<Patient>): void {
    this.dialogRef.close(result || {});
  }

  public isAddPatientButtonEnabled(): boolean {
    return !this.awaitingResponse && !this.patientForm.invalid;
  }

  public addPatient(formValues: PatientAddForm): void {
    this.awaitingResponse = true;
    this.patientStore
      .addPatient(
        new Patient({
          fullName: formValues.fullName,
          medicalRecordId: formValues.medicalRecordId,
          birthDate: formValues.birthDate
        })
      )
      .subscribe(
        patient => {
          this.snackBar.openSuccess('Paciente añadido correctamente');
          this.close({ data: patient });
        },
        error => {
          this.snackBar.openError(error);
          this.close({ error });
        }
      );
  }

  public onFocusBirthDatePicker(picker: MatDatepicker<Date>): void {
    picker.open();
    this.eventLoop
      .onNextTick()
      .subscribe(() => this.birthDateInput.nativeElement.focus());
  }

  public onOpenPicker(): void {
    this.eventLoop
      .onNextTick()
      .subscribe(() => this.birthDateInput.nativeElement.focus());
  }

  public onClosePicker(): void {
    this.eventLoop
      .onNextTick()
      .subscribe(() => this.birthDateInput.nativeElement.blur());
  }

  public onTabKeydown(picker: MatDatepicker<Date>): void {
    if (picker && picker.opened) {
      picker.close();
    }
  }
}
