/**
 * Based on https://github.com/adriengibrat/ts-custom-error.
 *
 * Note: The 'name' property must be explicitly set, otherwise it gets removed
 * from the build by Uglify.
 *
 * Example:
 *
 * class CustomError extends AbstractError {
 *   public readonly name = 'CustomError';
 *   public code!: string;
 * }
 */

export abstract class AbstractError extends Error {
  public constructor(message?: string) {
    super(message) /* istanbul ignore next */;

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}
