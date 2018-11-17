import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { ErcaToolBarItemDirective } from './tool-bar-item.directive';

@Component({
  selector: 'erca-tool-bar',
  exportAs: 'ercaToolBar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErcaToolBarComponent {
  @HostBinding('class.erca-tool-bar')
  readonly hostClass = true;

  @ContentChildren(ErcaToolBarItemDirective, { read: TemplateRef })
  readonly itemListTemplateRef!: QueryList<TemplateRef<any>>;

  @Input()
  appIcon?: SvgIcon;
  @Input()
  appTitle = '';
}
