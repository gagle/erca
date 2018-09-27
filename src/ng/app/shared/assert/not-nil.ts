import { isNil } from '../is-nil';

export function assertNotNil(value: any, error: Error): void {
  if (isNil(value)) {
    throw error;
  }
}
