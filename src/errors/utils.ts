import { AuthDomainError } from "./auth/AuthDomainError.js";
import { AuthUnexpectedError } from "./auth/AuthUnexpectedError.js";
import {
  AuthDomainErrorCodesType,
  AuthErrorCodesType,
  authErrorMapping,
  AuthUnexpectedErrorCodesType,
} from "./auth/errors.js";
import {
  OtpDomainErrorCodesType,
  OtpErrorCodesType,
  otpErrorMapping,
  OtpUnexpectedErrorCodesType,
} from "./otp/errors.js";

import { OtpDomainError } from "./otp/OtpDomainError.js";
import { OtpUnexpectedError } from "./otp/OtpUnexpectedError.js";

/**
 * Error response configuration interface
 *
 * @public
 */
export interface ErrorResponseConfig {
  /** HTTP status code */
  statusCode: number;
  /** User-friendly error message */
  responseMessage: string;
}

/**
 * Utility function to get authentication error response configuration
 *
 * @param code - The authentication error code
 * @returns Error response configuration with status code and message
 *
 * @example
 * ```typescript
 * const config = getAuthErrorResponse('AUTH_USED_EMAIL');
 * // returns { statusCode: 409, responseMessage: "Email already registered" }
 * ```
 *
 * @public
 */
export function getAuthErrorResponse(
  code: AuthErrorCodesType
): ErrorResponseConfig {
  return authErrorMapping[code];
}

/**
 * Utility function to get OTP error response configuration
 *
 * @param code - The OTP error code
 * @returns Error response configuration with status code and message
 *
 * @example
 * ```typescript
 * const config = getOtpErrorResponse('OTP_INVALID');
 * // returns { statusCode: 401, responseMessage: "The OTP you entered is incorrect..." }
 * ```
 *
 * @public
 */
export function getOtpErrorResponse(
  code: OtpErrorCodesType
): ErrorResponseConfig {
  return otpErrorMapping[code];
}

/**
 * Error Factory Utilities
 *
 * @remarks
 * Helper functions to create common error instances with consistent patterns.
 *
 * @public
 */
export class ErrorFactories {
  /**
   * Creates an authentication domain error with default message
   *
   * @param code - Domain error code
   * @param meta - Optional metadata
   * @returns Configured AuthDomainError instance
   *
   * @example
   * ```typescript
   * throw ErrorFactories.authDomain('AUTH_USED_EMAIL', { email: 'user@example.com' });
   * ```
   *
   * @public
   */
  static authDomain(
    code: AuthDomainErrorCodesType,
    meta?: {}
  ): AuthDomainError {
    return new AuthDomainError(code, undefined, meta);
  }

  /**
   * Creates an authentication unexpected error with cause
   *
   * @param code - Unexpected error code
   * @param cause - Original error
   * @param meta - Optional metadata
   * @returns Configured AuthUnexpectedError instance
   *
   * @example
   * ```typescript
   * throw ErrorFactories.authUnexpected(
   *   'AUTH_USER_CREATION_FAILED',
   *   dbError,
   *   { table: 'users' }
   * );
   * ```
   *
   * @public
   */
  static authUnexpected(
    code: AuthUnexpectedErrorCodesType,
    cause: unknown,
    meta?: {}
  ): AuthUnexpectedError {
    return new AuthUnexpectedError(code, cause, undefined, meta);
  }

  /**
   * Creates an OTP domain error with default message
   *
   * @param code - Domain error code
   * @param meta - Optional metadata
   * @returns Configured OtpDomainError instance
   *
   * @example
   * ```typescript
   * throw ErrorFactories.otpDomain('OTP_INVALID', { attempts: 3 });
   * ```
   *
   * @public
   */
  static otpDomain(code: OtpDomainErrorCodesType, meta?: {}): OtpDomainError {
    return new OtpDomainError(code, undefined, meta);
  }

  /**
   * Creates an OTP unexpected error with cause
   *
   * @param code - Unexpected error code
   * @param cause - Original error
   * @param meta - Optional metadata
   * @returns Configured OtpUnexpectedError instance
   *
   * @example
   * ```typescript
   * throw ErrorFactories.otpUnexpected(
   *   'OTP_CREATION_FAILED',
   *   smsError,
   *   { provider: 'twilio' }
   * );
   * ```
   *
   * @public
   */
  static otpUnexpected(
    code: OtpUnexpectedErrorCodesType,
    cause: unknown,
    meta?: {}
  ): OtpUnexpectedError {
    return new OtpUnexpectedError(code, cause, undefined, meta);
  }
}

/**
 * Type guard to check if an error is an AuthDomainError
 *
 * @param error - The error to check
 * @returns True if the error is an AuthDomainError
 *
 * @example
 * ```typescript
 * if (isAuthDomainError(error)) {
 *   // Handle domain error specifically
 *   logger.warn(error.message);
 * }
 * ```
 *
 * @public
 */
export function isAuthDomainError(error: unknown): error is AuthDomainError {
  return error instanceof AuthDomainError;
}

/**
 * Type guard to check if an error is an AuthUnexpectedError
 *
 * @param error - The error to check
 * @returns True if the error is an AuthUnexpectedError
 *
 * @example
 * ```typescript
 * if (isAuthUnexpectedError(error)) {
 *   // Handle unexpected error specifically
 *   logger.error(error.message, error.cause);
 * }
 * ```
 *
 * @public
 */
export function isAuthUnexpectedError(
  error: unknown
): error is AuthUnexpectedError {
  return error instanceof AuthUnexpectedError;
}

/**
 * Type guard to check if an error is an OtpDomainError
 *
 * @param error - The error to check
 * @returns True if the error is an OtpDomainError
 *
 * @example
 * ```typescript
 * if (isOtpDomainError(error)) {
 *   // Handle OTP domain error specifically
 *   return response.status(401).json({ error: error.message });
 * }
 * ```
 *
 * @public
 */
export function isOtpDomainError(error: unknown): error is OtpDomainError {
  return error instanceof OtpDomainError;
}

/**
 * Type guard to check if an error is an OtpUnexpectedError
 *
 * @param error - The error to check
 * @returns True if the error is an OtpUnexpectedError
 *
 * @example
 * ```typescript
 * if (isOtpUnexpectedError(error)) {
 *   // Handle OTP unexpected error specifically
 *   sentry.captureException(error);
 * }
 * ```
 *
 * @public
 */
export function isOtpUnexpectedError(
  error: unknown
): error is OtpUnexpectedError {
  return error instanceof OtpUnexpectedError;
}
