import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { TRUETA } from '../../icons';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolBarComponent {
  @HostBinding('class.app-tool-bar')
  readonly hostClass = true;

  readonly TRUETA = TRUETA;
}
