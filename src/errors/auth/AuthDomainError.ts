import { AuthError } from "./AuthError.js";
import { AuthDomainErrorCodesType } from "./errors.js";

/**
 * Authentication Domain Error Class
 *
 * @remarks
 * Represents expected business logic errors that occur during normal authentication operations.
 * These errors are user-facing and typically result from invalid user input or business rules.
 *
 * Domain errors use 'warn' log level as they are expected and don't indicate system problems.
 *
 * @example
 * ```typescript
 * // User tries to register with existing email
 * throw new AuthDomainError(AuthDomainErrorCodes.AUTH_USED_EMAIL);
 *
 * // User provides wrong password
 * throw new AuthDomainError(AuthDomainErrorCodes.INCORRECT_CREDENTIALS);
 * ```
 *
 * @public
 */
export class AuthDomainError extends AuthError {
  /**
   * Creates a new AuthDomainError instance
   *
   * @param code - The domain error code from AuthDomainErrorCodes
   * @param msg - Optional custom error message (uses default message if not provided)
   * @param meta - Additional metadata for context and debugging
   *
   * @example
   * ```typescript
   * // Basic usage with default message
   * throw new AuthDomainError(AuthDomainErrorCodes.AUTH_USED_EMAIL);
   *
   * // With custom message and metadata
   * throw new AuthDomainError(
   *   AuthDomainErrorCodes.INCORRECT_CREDENTIALS,
   *   'Too many failed attempts',
   *   { userId: '123', attempts: 5 }
   * );
   * ```
   *
   * @public
   */
  constructor(code: AuthDomainErrorCodesType, msg?: string, meta?: {}) {
    super({
      code,
      name: "AuthDomainError",
      logLevel: "warn",
      message: msg || code,
      meta,
    });

    Object.setPrototypeOf(this, AuthDomainError.prototype);
  }
}
