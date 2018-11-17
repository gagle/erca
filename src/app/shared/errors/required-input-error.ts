import { AbstractError } from './abstract-error';

export class RequiredInputError extends AbstractError {
  readonly name = 'RequiredInputError';
}
