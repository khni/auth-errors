import { OtpDomainErrorCodesType } from "./errors.js";
import { OtpError } from "./OtpError.js";

/**
 * OTP Domain Error Class
 *
 * @remarks
 * Represents expected business logic errors that occur during normal OTP operations.
 * These errors are user-facing and typically result from invalid OTP codes, expired tokens,
 * or other user-related issues.
 *
 * Domain errors use 'warn' log level as they are expected and don't indicate system problems.
 *
 * @example
 * ```typescript
 * // User enters wrong OTP code
 * throw new OtpDomainError(OtpDomainErrorCodes.OTP_INVALID);
 *
 * // OTP code has expired
 * throw new OtpDomainError(OtpDomainErrorCodes.OTP_EXPIRED);
 * ```
 *
 * @public
 */
export class OtpDomainError extends OtpError {
  /**
   * Creates a new OtpDomainError instance
   *
   * @param code - The domain error code from OtpDomainErrorCodes
   * @param msg - Optional custom error message (uses default message if not provided)
   * @param meta - Additional metadata for context and debugging
   *
   * @example
   * ```typescript
   * // Basic usage with default message
   * throw new OtpDomainError(OtpDomainErrorCodes.OTP_INVALID);
   *
   * // With custom message and metadata
   * throw new OtpDomainError(
   *   OtpDomainErrorCodes.OTP_EXPIRED,
   *   'OTP expired after 5 minutes',
   *   { userId: '123', generatedAt: '2023-01-01T00:00:00Z' }
   * );
   * ```
   *
   * @public
   */
  constructor(code: OtpDomainErrorCodesType, msg?: string, meta?: {}) {
    super({
      code,
      name: "OtpDomainError",
      logLevel: "warn",
      message: msg || code,
      meta,
    });

    Object.setPrototypeOf(this, OtpDomainError.prototype);
  }
}
