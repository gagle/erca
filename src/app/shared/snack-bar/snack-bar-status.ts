export class SnackBarStatus {
  static SUCCESS = new SnackBarStatus('success');
  static WARNING = new SnackBarStatus('warning');
  static ERROR = new SnackBarStatus('error');

  private constructor(readonly name: string) {}
}
