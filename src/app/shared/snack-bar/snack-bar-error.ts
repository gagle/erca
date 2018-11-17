import { AbstractError } from '../errors/abstract-error';

export class SnackBarError extends AbstractError {
  public readonly name = 'SnackBarError';
}
