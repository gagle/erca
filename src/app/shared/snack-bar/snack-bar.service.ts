import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SnackBarStatus } from './snack-bar-status';
import { ErcaSnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(
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

  openSuccess(message: string): MatSnackBarRef<ErcaSnackBarComponent> {
    return this.open(SnackBarStatus.SUCCESS, message);
  }

  openWarning(message: string): MatSnackBarRef<ErcaSnackBarComponent> {
    return this.open(SnackBarStatus.WARNING, message);
  }

  openError(message: string): MatSnackBarRef<ErcaSnackBarComponent> {
    return this.open(SnackBarStatus.ERROR, message);
  }
}
