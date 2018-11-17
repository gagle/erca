import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  selector: 'erca-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErcaTextFieldComponent {
  @HostBinding('class.erca-text-field')
  readonly hostClass = true;

  @Input()
  title = '';

  @Input()
  content = '';
}
