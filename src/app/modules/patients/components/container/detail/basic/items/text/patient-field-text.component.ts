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
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { EDIT } from '../../../../../../../../icons';

@Component({
  selector: 'app-patient-field-text',
  templateUrl: './patient-field-text.component.html',
  styleUrls: ['./patient-field-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientFieldTextComponent implements OnInit {
  @HostBinding('class.app-patient-field-text')
  readonly hostClass = true;

  readonly EDIT = EDIT;

  readonly textControl = new FormControl('');

  @Output()
  readonly update = new EventEmitter<string>(true);

  private readonly debounceTimeMs = 300;

  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(val: string | null) {
    this.textControl.setValue(val, { emitEvent: false });
    this._value = val;
  }

  private _value: string | null = null;

  ngOnInit(): void {
    this.textControl.valueChanges
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((text: string) => {
        this.update.emit(text);
      });
  }
}
