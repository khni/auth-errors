/**
 * OTP (One-Time Password) Error Handling System
 *
 * @packageDocumentation
 * @module OtpErrors
 */

/**
 * OTP Domain Error Codes
 *
 * @remarks
 * Expected errors related to One-Time Password operations that occur
 * during normal business logic and should be returned to the client.
 *
 * @public
 */
export const OtpDomainErrorCodes = {
  /** Provided OTP code is incorrect */
  OTP_INVALID: "OTP_INVALID",
  /** OTP code has expired */
  OTP_EXPIRED: "OTP_EXPIRED",
  /** OTP session token has expired */
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  /** OTP token is invalid or expired */
  OTP_TOKEN_INVALID: "OTP_TOKEN_INVALID",
} as const;

/**
 * OTP Unexpected/Internal Error Codes
 *
 * @remarks
 * System-level failures in OTP generation or verification services
 * that indicate infrastructure problems.
 *
 * @public
 */
export const OtpUnexpectedErrorCodes = {
  /** OTP generation service failed */
  OTP_CREATION_FAILED: "OTP_CREATION_FAILED",
  /** OTP verification service failed */
  OTP_VERIFICATION_FAILED: "OTP_VERIFICATION_FAILED",
} as const;

/**
 * Combined OTP Domain Error Codes Type
 *
 * @public
 */
export type OtpDomainErrorCodesType =
  (typeof OtpDomainErrorCodes)[keyof typeof OtpDomainErrorCodes];

/**
 * Combined OTP Unexpected Error Codes Type
 *
 * @public
 */
export type OtpUnexpectedErrorCodesType =
  (typeof OtpUnexpectedErrorCodes)[keyof typeof OtpUnexpectedErrorCodes];

/**
 * Complete OTP Error Codes (Domain + Unexpected)
 *
 * @public
 */
export const OtpErrorCodes = {
  ...OtpDomainErrorCodes,
  ...OtpUnexpectedErrorCodes,
} as const;

/**
 * Combined OTP Error Codes Type
 *
 * @public
 */
export type OtpErrorCodesType =
  (typeof OtpErrorCodes)[keyof typeof OtpErrorCodes];

/**
 * OTP Domain Error Mapping
 *
 * @remarks
 * Maps OTP domain error codes to appropriate HTTP status codes and user-friendly messages.
 * These errors help users understand what went wrong with their OTP operation.
 *
 * @public
 */
export const otpDomainErrorMapping = {
  [OtpDomainErrorCodes.OTP_INVALID]: {
    statusCode: 401,
    responseMessage: "The OTP you entered is incorrect. Please try again.",
  },
  [OtpDomainErrorCodes.OTP_EXPIRED]: {
    statusCode: 401,
    responseMessage: "The OTP is expired. Please request a new one.",
  },
  [OtpDomainErrorCodes.TOKEN_EXPIRED]: {
    statusCode: 401,
    responseMessage: "Token is expired.",
  },
  [OtpDomainErrorCodes.OTP_TOKEN_INVALID]: {
    statusCode: 401,
    responseMessage: "Please request new OTP",
  },
} as const;

/**
 * OTP Unexpected Error Mapping
 *
 * @remarks
 * Maps OTP internal error codes to HTTP 500 status with generic messages
 * to avoid exposing OTP service implementation details.
 *
 * @public
 */
export const otpUnexpectedErrorMapping = {
  [OtpUnexpectedErrorCodes.OTP_CREATION_FAILED]: {
    statusCode: 500,
    responseMessage: "Something went wrong while creating OTP",
  },
  [OtpUnexpectedErrorCodes.OTP_VERIFICATION_FAILED]: {
    statusCode: 500,
    responseMessage: "Something went wrong while verifying OTP",
  },
} as const;

/**
 * Complete OTP Error Mapping
 *
 * @remarks
 * Combined mapping for all OTP errors (domain + unexpected)
 *
 * @public
 */
export const otpErrorMapping = {
  ...otpDomainErrorMapping,
  ...otpUnexpectedErrorMapping,
} as const satisfies Record<
  OtpErrorCodesType,
  {
    statusCode: number;
    responseMessage: string;
  }
>;
