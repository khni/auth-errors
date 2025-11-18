# @khni/auth-errors

## 1.0.0

### Major Changes

- Introduce a complete authentication and OTP error architecture aligned with the @khni/error-handler pattern.
  This version adds domain errors, public errors, unexpected errors, and consolidated error exports for both auth and OTP flows.
  Provides a scalable structure for consistent error handling, domain-safe error isolation, and future integration with @khni/auth.
  Includes new folders: errors/auth and errors/otp, each containing domain, public, and unexpected error types, plus shared utilities.
