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
  public readonly hostClass = true;

  public readonly EDIT = EDIT;

  public readonly form = this.formBuilder.group({
    text: ['']
  });

  @Output()
  public readonly update = new EventEmitter<string>(true);

  private readonly debounceTimeMs = 300;

  @Input()
  public get value(): string | null {
    return this._value;
  }
  public set value(val: string | null) {
    this.getControl().setValue(val, { emitEvent: false });
    this._value = val;
  }

  private _value: string | null = null;

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.getControl()
      .valueChanges.pipe(debounceTime(this.debounceTimeMs))
      .subscribe((text: string) => {
        this.update.emit(text);
      });
  }

  private getControl(): AbstractControl {
    return this.form.get('text')!;
  }
}
