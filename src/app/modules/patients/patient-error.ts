import { AbstractError } from '../../shared/errors/abstract-error';

export class PatientError extends AbstractError {
  readonly name = 'PatientError';
}
