//errors

export * from "./errors/auth/AuthError.js";
export * from "./errors/auth/AuthDomainError.js";
export * from "./errors/auth/AuthUnexpectedError.js";
export * from "./errors/auth/errors.js";

export * from "./errors/otp/OtpError.js";
export * from "./errors/otp/OtpDomainError.js";
export * from "./errors/otp/OtpUnexpectedError.js";
export * from "./errors/otp/errors.js";

export * from "./errors/utils.js";

export type { ErrorResponse } from "@khni/error-handler";
