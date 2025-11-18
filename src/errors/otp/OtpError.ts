import { CustomError, CustomErrorConstructor } from "@khni/error-handler";
import { OtpErrorCodesType } from "./errors.js";

/**
 * Base OTP Error Class
 *
 * @remarks
 * Extends the framework's CustomError class to provide typed OTP errors.
 * This serves as the foundation for all OTP-related errors in the system.
 *
 * @example
 * ```typescript
 * throw new OtpError({
 *   code: 'OTP_INVALID',
 *   name: 'OtpError',
 *   logLevel: 'warn',
 *   message: 'The provided OTP code is invalid'
 * });
 * ```
 *
 * @public
 */
export class OtpError extends CustomError<OtpErrorCodesType> {
  /**
   * Creates a new OtpError instance
   *
   * @param error - Error configuration object
   * @param error.code - The specific OTP error code
   * @param error.name - The name of the error class
   * @param error.logLevel - Log level for error reporting ('warn' for domain errors, 'error' for unexpected)
   * @param error.message - Human readable error message
   * @param error.cause - Original error that caused this one (for unexpected errors)
   * @param error.meta - Additional metadata for debugging
   *
   * @public
   */
  constructor(
    error: CustomErrorConstructor<OtpErrorCodesType> & { name: string }
  ) {
    super(error);

    Object.setPrototypeOf(this, OtpError.prototype);
  }
}
