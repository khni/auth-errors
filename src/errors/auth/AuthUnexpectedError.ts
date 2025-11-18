import { AuthError } from "./AuthError.js";
import { AuthUnexpectedErrorCodesType } from "./errors.js";

/**
 * Authentication Unexpected Error Class
 *
 * @remarks
 * Represents unexpected system-level failures that occur during authentication operations.
 * These errors indicate problems with infrastructure, database connections, or external services.
 *
 * Unexpected errors use 'error' log level as they require investigation and monitoring.
 *
 * @example
 * ```typescript
 * try {
 *   await createUser(userData);
 * } catch (error) {
 *   throw new AuthUnexpectedError(
 *     AuthUnexpectedErrorCodes.AUTH_USER_CREATION_FAILED,
 *     error,
 *     'Failed to create user in database'
 *   );
 * }
 * ```
 *
 * @public
 */
export class AuthUnexpectedError extends AuthError {
  /**
   * Creates a new AuthUnexpectedError instance
   *
   * @param code - The unexpected error code from AuthUnexpectedErrorCodes
   * @param cause - The original error that caused this failure
   * @param msg - Optional custom error message (uses default message if not provided)
   * @param meta - Additional metadata for debugging and monitoring
   *
   * @example
   * ```typescript
   * // With original error and metadata
   * throw new AuthUnexpectedError(
   *   AuthUnexpectedErrorCodes.FINDING_USER_FAILED,
   *   databaseError,
   *   'Database connection failed while finding user',
   *   { query: userQuery, duration: 5000 }
   * );
   * ```
   *
   * @public
   */
  constructor(
    code: AuthUnexpectedErrorCodesType,
    cause: unknown,
    msg?: string,
    meta?: {}
  ) {
    super({
      code,
      name: "AuthUnexpectedError",
      logLevel: "error",
      message: msg || code,
      cause,
      meta,
    });

    Object.setPrototypeOf(this, AuthUnexpectedError.prototype);
  }
}
