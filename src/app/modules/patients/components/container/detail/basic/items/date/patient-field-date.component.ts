import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patient-field-date',
  templateUrl: './patient-field-date.component.html',
  styleUrls: ['./patient-field-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientFieldDateComponent implements OnInit {
  @HostBinding('class.app-patient-field-date')
  readonly hostClass = true;

  readonly form = this.formBuilder.group({
    date: ['']
  });

  @Output()
  readonly update = new EventEmitter<Date>(true);

  @Input()
  get value(): Date | null {
    return this._value;
  }
  set value(val: Date | null) {
    this.getControl().setValue(val, { emitEvent: false });
    this._value = val;
  }

  private _value: Date | null = null;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getControl().valueChanges.subscribe((date: Date) => {
      this.update.emit(date);
    });
  }

  private getControl(): AbstractControl {
    return this.form.get('date')!;
  }
}
