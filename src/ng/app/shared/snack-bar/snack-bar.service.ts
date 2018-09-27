import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SnackBarStatus } from './snack-bar-status';
import { ErcaSnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  public constructor(private snackBar: MatSnackBar) {}

  public open(
    status: SnackBarStatus,
    message: string
  ): MatSnackBarRef<ErcaSnackBarComponent> {
    return this.snackBar.openFromComponent(ErcaSnackBarComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 5000,
      data: {
        status,
        message
      }
    });
  }

  public openSuccess(message: string): MatSnackBarRef<ErcaSnackBarComponent> {
    return this.open(SnackBarStatus.SUCCESS, message);
  }

  public openWarning(message: string): MatSnackBarRef<ErcaSnackBarComponent> {
    return this.open(SnackBarStatus.WARNING, message);
  }

  public openError(message: string): MatSnackBarRef<ErcaSnackBarComponent> {
    return this.open(SnackBarStatus.ERROR, message);
  }
}
