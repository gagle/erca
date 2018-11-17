import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { CLOSE_EXIT, WARNING, YES } from '../../icons';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SnackBarComponentData } from './snack-bar-component-data';
import { SnackBarError } from './snack-bar-error';
import { SnackBarStatus } from './snack-bar-status';

@Component({
  selector: 'erca-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErcaSnackBarComponent implements OnInit {
  @HostBinding('class.erca-snack-bar')
  readonly hostClass = true;

  statusIcon: SvgIcon | null = null;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarComponentData) {}

  ngOnInit(): void {
    this.setStatus();
  }

  getStatus(): SnackBarStatus {
    return this.data.status;
  }

  getStatusClassName(): string {
    return this.data.status.name;
  }

  private setStatus(): void {
    switch (this.data.status) {
      case SnackBarStatus.SUCCESS:
        this.statusIcon = YES;
        break;
      case SnackBarStatus.WARNING:
        this.statusIcon = WARNING;
        break;
      case SnackBarStatus.ERROR:
        this.statusIcon = CLOSE_EXIT;
        break;
      default:
        throw new SnackBarError(
          `Invalid SnackBarStatus status value '${this.data.status}'`
        );
    }
  }
}
