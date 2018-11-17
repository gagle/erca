import { AbstractError } from '../../shared/errors/abstract-error';

export class PatientError extends AbstractError {
  public readonly name = 'PatientError';
}
