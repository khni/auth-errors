/**
 * Authentication Error Handling System
 *
 * @packageDocumentation
 * @module AuthErrors
 */

/**
 * Authentication Domain Error Codes
 *
 * @remarks
 * These are expected errors that occur during normal authentication operations
 * and should be returned to the client with appropriate HTTP status codes.
 *
 * @public
 */
export const AuthDomainErrorCodes = {
  /** Email is already registered during signup */
  AUTH_USED_EMAIL: "AUTH_USED_EMAIL",
  /** Username or identifier is already taken */
  AUTH_USED_IDENTIFIER: "AUTH_USED_IDENTIFIER",
  /** User attempted to access resource without verifying email */
  AUTH_UNVERIFIED_EMAIL: "AUTH_UNVERIFIED_EMAIL",
  /** Invalid email/password combination during login */
  INCORRECT_CREDENTIALS: "INCORRECT_CREDENTIALS",
  /** User registered via OAuth but attempted local authentication */
  USER_NOT_LOCAL: "USER_NOT_LOCAL",
  /** Refresh token is invalid, expired, or revoked */
  REFRESH_TOKEN_INVALID: "REFRESH_TOKEN_INVALID",
  /** Authorization header is missing or malformed */
  MISSING_OR_MALFORMED_AUTHORIZATION_HEADER:
    "MISSING_OR_MALFORMED_AUTHORIZATION_HEADER",
  /** Access token is invalid or malformed */
  INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
  /** Access token has expired */
  EXPIRED_ACCESS_TOKEN: "EXPIRED_ACCESS_TOKEN",
  /** No access token provided in request */
  MISSING_ACCESS_TOKEN: "MISSING_ACCESS_TOKEN",
  /** No refresh token provided during logout or refresh */
  MISSING_REFRESH_TOKEN: "MISSING_REFRESH_TOKEN",
  /** User not found in database during authentication */
  USER_IS_NOT_EXIST: "USER_IS_NOT_EXIST",
} as const;

/**
 * Authentication Unexpected/Internal Error Codes
 *
 * @remarks
 * These represent system-level failures that should not normally occur
 * during business operations. They indicate problems with infrastructure,
 * database connections, or other internal services.
 *
 * @public
 */
export const AuthUnexpectedErrorCodes = {
  /** Database failure while searching for user */
  FINDING_USER_FAILED: "FINDING_USER_FAILED",
  /** User creation failed in database */
  AUTH_USER_CREATION_FAILED: "AUTH_USER_CREATION_FAILED",
  /** JWT token generation failed */
  ISSUE_TOKEN_FAILED: "ISSUE_TOKEN_FAILED",
  /** Password reset operation failed */
  PASSWORD_RESET_FAILED: "PASSWORD_RESET_FAILED",
  /** Failed to revoke refresh token */
  REFRESHTOKEN_REVOKE_FAILED: "REFRESHTOKEN_REVOKE_FAILED",
  /** Failed to create refresh token */
  REFRESHTOKEN_CREATE_FAILED: "REFRESHTOKEN_CREATE_FAILED",
  /** Failed to verify refresh token */
  REFRESHTOKEN_VERIFY_FAILED: "REFRESHTOKEN_VERIFY_FAILED",
  /** General login process failure */
  LOGIN_FAILED: "LOGIN_FAILED",
} as const;

/**
 * Combined Authentication Domain Error Codes Type
 *
 * @public
 */
export type AuthDomainErrorCodesType =
  (typeof AuthDomainErrorCodes)[keyof typeof AuthDomainErrorCodes];

/**
 * Combined Authentication Unexpected Error Codes Type
 *
 * @public
 */
export type AuthUnexpectedErrorCodesType =
  (typeof AuthUnexpectedErrorCodes)[keyof typeof AuthUnexpectedErrorCodes];

/**
 * Complete Authentication Error Codes (Domain + Unexpected)
 *
 * @public
 */
export const AuthErrorCodes = {
  ...AuthDomainErrorCodes,
  ...AuthUnexpectedErrorCodes,
} as const;

/**
 * Combined Authentication Error Codes Type
 *
 * @public
 */
export type AuthErrorCodesType =
  (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes];

/**
 * Authentication Domain Error Mapping
 *
 * @remarks
 * Maps domain error codes to appropriate HTTP status codes and user-friendly messages.
 * These errors are expected and represent normal business logic failures.
 *
 * @public
 */
export const authDomainErrorMapping = {
  [AuthDomainErrorCodes.AUTH_USED_EMAIL]: {
    statusCode: 409,
    responseMessage: "Email already registered",
  },
  [AuthDomainErrorCodes.AUTH_USED_IDENTIFIER]: {
    statusCode: 409,
    responseMessage: "Identifier already registered",
  },
  [AuthDomainErrorCodes.AUTH_UNVERIFIED_EMAIL]: {
    statusCode: 403,
    responseMessage: "Email verification required",
  },
  [AuthDomainErrorCodes.INCORRECT_CREDENTIALS]: {
    statusCode: 401,
    responseMessage: "Invalid credentials",
  },
  [AuthDomainErrorCodes.USER_NOT_LOCAL]: {
    statusCode: 400,
    responseMessage: "External authentication required",
  },
  [AuthDomainErrorCodes.REFRESH_TOKEN_INVALID]: {
    statusCode: 401,
    responseMessage:
      "Refresh token is invalid or expired. Please log in again.",
  },
  [AuthDomainErrorCodes.MISSING_OR_MALFORMED_AUTHORIZATION_HEADER]: {
    statusCode: 401,
    responseMessage: "Access is denied.",
  },
  [AuthDomainErrorCodes.INVALID_ACCESS_TOKEN]: {
    statusCode: 401,
    responseMessage:
      "The provided access token is invalid or has expired. Please log in again.",
  },
  [AuthDomainErrorCodes.EXPIRED_ACCESS_TOKEN]: {
    statusCode: 401,
    responseMessage:
      "The provided access token is expired. Please log in again.",
  },
  [AuthDomainErrorCodes.MISSING_ACCESS_TOKEN]: {
    statusCode: 401,
    responseMessage:
      "Access token is missing. Please provide a valid access token.",
  },
  [AuthDomainErrorCodes.MISSING_REFRESH_TOKEN]: {
    statusCode: 400,
    responseMessage: "You are already Logged out",
  },
  [AuthDomainErrorCodes.USER_IS_NOT_EXIST]: {
    statusCode: 400,
    responseMessage: "Email is not Exist in the Database",
  },
} as const;

/**
 * Authentication Unexpected Error Mapping
 *
 * @remarks
 * Maps unexpected/internal error codes to HTTP 500 status with generic messages
 * to avoid exposing internal implementation details.
 *
 * @public
 */
export const authUnexpectedErrorMapping = {
  [AuthUnexpectedErrorCodes.AUTH_USER_CREATION_FAILED]: {
    statusCode: 500,
    responseMessage: "Account creation failed",
  },
  [AuthUnexpectedErrorCodes.ISSUE_TOKEN_FAILED]: {
    statusCode: 400,
    responseMessage: "Unexpected error while issuing tokens.",
  },
  [AuthUnexpectedErrorCodes.PASSWORD_RESET_FAILED]: {
    statusCode: 500,
    responseMessage: "Password Reset Failed",
  },
  [AuthUnexpectedErrorCodes.REFRESHTOKEN_REVOKE_FAILED]: {
    statusCode: 500,
    responseMessage: "Failed to Logout",
  },
  [AuthUnexpectedErrorCodes.REFRESHTOKEN_CREATE_FAILED]: {
    statusCode: 500,
    responseMessage: "Failed to create refresh token",
  },
  [AuthUnexpectedErrorCodes.REFRESHTOKEN_VERIFY_FAILED]: {
    statusCode: 500,
    responseMessage: "Failed to verify refresh token",
  },
  [AuthUnexpectedErrorCodes.LOGIN_FAILED]: {
    statusCode: 500,
    responseMessage: "Something went wrong while login",
  },
  [AuthUnexpectedErrorCodes.FINDING_USER_FAILED]: {
    statusCode: 500,
    responseMessage: "Something went wrong while finding the user",
  },
} as const;

/**
 * Complete Authentication Error Mapping
 *
 * @remarks
 * Combined mapping for all authentication errors (domain + unexpected)
 *
 * @public
 */
export const authErrorMapping = {
  ...authDomainErrorMapping,
  ...authUnexpectedErrorMapping,
} as const satisfies Record<
  AuthErrorCodesType,
  {
    statusCode: number;
    responseMessage: string;
  }
>;
