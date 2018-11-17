export class SnackBarStatus {
  public static SUCCESS = new SnackBarStatus('success');
  public static WARNING = new SnackBarStatus('warning');
  public static ERROR = new SnackBarStatus('error');

  private constructor(public readonly name: string) {}
}
