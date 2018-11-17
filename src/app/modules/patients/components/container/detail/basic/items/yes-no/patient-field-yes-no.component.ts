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
  selector: 'app-patient-field-yes-no',
  templateUrl: './patient-field-yes-no.component.html',
  styleUrls: ['./patient-field-yes-no.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientFieldYesNoComponent {
  @HostBinding('class.app-patient-field-yes-no')
  readonly hostClass = true;

  @Output()
  readonly update = new EventEmitter<boolean>(true);

  @Input()
  multiple = true;

  @Input()
  get value(): boolean {
    return this._value[0];
  }
  set value(val: boolean) {
    if (!this.emittedChange) {
      this._value = [this.multiple ? val : !!val];
    }
  }

  private _value: boolean[] = this.multiple ? [] : [false];
  private emittedChange = false;

  onChange(event: MatButtonToggleChange): void {
    this.emittedChange = true;

    if (this.multiple) {
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
    } else {
      this.update.emit(event.value);
    }
  }
}
