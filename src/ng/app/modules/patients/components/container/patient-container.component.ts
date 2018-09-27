import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-patient-container',
  templateUrl: './patient-container.component.html',
  styleUrls: ['./patient-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientContainerComponent {
  @HostBinding('class.app-patient-container')
  public readonly hostClass = true;
}
