import { CustomError, CustomErrorConstructor } from "@khni/error-handler";
import { AuthErrorCodesType } from "./errors.js";

/**
 * Base Authentication Error Class
 *
 * @remarks
 * Extends the framework's CustomError class to provide typed authentication errors.
 * This serves as the foundation for all authentication-related errors in the system.
 *
 * @example
 * ```typescript
 * throw new AuthError({
 *   code: 'INCORRECT_CREDENTIALS',
 *   name: 'AuthError',
 *   logLevel: 'warn',
 *   message: 'Invalid email or password'
 * });
 * ```
 *
 * @public
 */
export class AuthError extends CustomError<AuthErrorCodesType> {
  /**
   * Creates a new AuthError instance
   *
   * @param error - Error configuration object
   * @param error.code - The specific authentication error code
   * @param error.name - The name of the error class
   * @param error.logLevel - Log level for error reporting ('warn' for domain errors, 'error' for unexpected)
   * @param error.message - Human readable error message
   * @param error.cause - Original error that caused this one (for unexpected errors)
   * @param error.meta - Additional metadata for debugging
   *
   * @public
   */
  constructor(
    error: CustomErrorConstructor<AuthErrorCodesType> & { name: string }
  ) {
    super(error);

    Object.setPrototypeOf(this, AuthError.prototype);
  }
}
