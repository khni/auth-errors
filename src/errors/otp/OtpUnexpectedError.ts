import { OtpUnexpectedErrorCodesType } from "./errors.js";
import { OtpError } from "./OtpError.js";

/**
 * OTP Unexpected Error Class
 *
 * @remarks
 * Represents unexpected system-level failures that occur during OTP operations.
 * These errors indicate problems with OTP generation services, storage, or verification systems.
 *
 * Unexpected errors use 'error' log level as they require investigation and monitoring.
 *
 * @example
 * ```typescript
 * try {
 *   await generateOtp(userId);
 * } catch (error) {
 *   throw new OtpUnexpectedError(
 *     OtpUnexpectedErrorCodes.OTP_CREATION_FAILED,
 *     error,
 *     'Failed to generate OTP code'
 *   );
 * }
 * ```
 *
 * @public
 */
export class OtpUnexpectedError extends OtpError {
  /**
   * Creates a new OtpUnexpectedError instance
   *
   * @param code - The unexpected error code from OtpUnexpectedErrorCodes
   * @param cause - The original error that caused this failure
   * @param msg - Optional custom error message (uses default message if not provided)
   * @param meta - Additional metadata for debugging and monitoring
   *
   * @example
   * ```typescript
   * // With original error and metadata
   * throw new OtpUnexpectedError(
   *   OtpUnexpectedErrorCodes.OTP_VERIFICATION_FAILED,
   *   serviceError,
   *   'OTP verification service unavailable',
   *   { userId: '123', service: 'sms-gateway' }
   * );
   * ```
   *
   * @public
   */
  constructor(
    code: OtpUnexpectedErrorCodesType,
    cause: unknown,
    msg?: string,
    meta?: {}
  ) {
    super({
      code,
      name: "OtpUnexpectedError",
      logLevel: "error",
      message: msg || code,
      cause,
      meta,
    });

    Object.setPrototypeOf(this, OtpUnexpectedError.prototype);
  }
}
