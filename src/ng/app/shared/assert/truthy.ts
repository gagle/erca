export function assertTruthy(value: any, error: Error): void {
  if (!value) {
    throw error;
  }
}
