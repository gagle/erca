import { AbstractError } from './abstract-error';

export class IllegalArgumentError extends AbstractError {
  readonly name = 'IllegalArgumentError';
}
