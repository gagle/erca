import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { assertTruthy } from '../../../../../../shared/assert/truthy';
import { RequiredInputError } from '../../../../../../shared/errors/required-input-error';
import { Patient } from '../../../../models/patient.model';

@Component({
  selector: 'app-patient-list-item',
  templateUrl: './patient-list-item.component.html',
  styleUrls: ['./patient-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientListItemComponent implements OnChanges {
  @HostBinding('class.app-patient-list-item')
  readonly hostClass = true;

  @Input()
  patient!: Patient;
  @Input()
  highlightedText = '';

  ngOnChanges(changes: SimpleChanges): void {
    assertTruthy(
      changes.patient.currentValue,
      new RequiredInputError('Missing patient')
    );
  }
}
