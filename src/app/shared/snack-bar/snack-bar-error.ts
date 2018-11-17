import { AbstractError } from '../errors/abstract-error';

export class SnackBarError extends AbstractError {
  readonly name = 'SnackBarError';
}
