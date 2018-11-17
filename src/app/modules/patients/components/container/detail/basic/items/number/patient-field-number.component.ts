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
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-patient-field-number',
  templateUrl: './patient-field-number.component.html',
  styleUrls: ['./patient-field-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientFieldNumberComponent implements OnInit {
  @HostBinding('class.app-patient-field-number')
  readonly hostClass = true;

  @HostBinding('style.width')
  width!: string;

  readonly form = this.formBuilder.group({
    number: ['']
  });

  @Input()
  min = -Infinity;
  @Input()
  max = Infinity;
  @Input()
  unit = '';

  @Output()
  readonly update = new EventEmitter<number>(true);

  private readonly debounceTimeMs = 300;

  @Input()
  get value(): number | null {
    return this._value;
  }
  set value(val: number | null) {
    this.getControl().setValue(val, { emitEvent: false });
    this._value = val;
  }

  private _value: number | null = null;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getControl()
      .valueChanges.pipe(debounceTime(this.debounceTimeMs))
      .subscribe((text: string) => {
        this.update.emit(parseInt(text, 10));
      });

    if (Number.isFinite(this.max)) {
      this.width = `${this.max.toString().length +
        (this.unit.length ? 4 : 1)}ch`;
    }
  }

  private getControl(): AbstractControl {
    return this.form.get('number')!;
  }
}
