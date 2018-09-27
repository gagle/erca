import { AbstractError } from './abstract-error';

export class IllegalArgumentError extends AbstractError {
  public readonly name = 'IllegalArgumentError';
}
