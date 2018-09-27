import { AbstractError } from './abstract-error';

export class RequiredInputError extends AbstractError {
  public readonly name = 'RequiredInputError';
}
