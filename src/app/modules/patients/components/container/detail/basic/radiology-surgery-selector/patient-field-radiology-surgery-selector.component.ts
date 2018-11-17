import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-patient-field-radiology-surgery-selector',
  templateUrl: './patient-field-radiology-surgery-selector.component.html',
  styleUrls: ['./patient-field-radiology-surgery-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientFieldRadiologySurgerySelectorComponent {
  @HostBinding('class.app-patient-field-radiology-surgery-selector')
  readonly hostClass = true;

  @Output()
  readonly update = new EventEmitter<string>(true);

  @Input()
  get value(): string {
    return this._value[0];
  }
  set value(val: string) {
    if (!this.emittedChange) {
      this._value = [val];
    }
  }

  private _value: string[] = [];
  private emittedChange = false;

  onChange(event: MatButtonToggleChange): void {
    this.emittedChange = true;

    const toggle = event.source;

    if (toggle) {
      const group = toggle.buttonToggleGroup;
      if (event.value.some((item: boolean) => item === toggle.value)) {
        group.value = [toggle.value];
      }
    }

    event.value.reverse();

    if (event.value[0] === undefined) {
      this._value = [];
    } else if (!this._value.length) {
      this._value = [event.value[0]];
    }
    this.update.emit(event.value[0]);
  }
}
