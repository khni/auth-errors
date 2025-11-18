# @khni/auth-errors

A comprehensive authentication and OTP error handling system built on the @khni/error-handler foundation, designed for seamless integration with the @khni/auth package. This TypeScript/JavaScript library provides structured error classes, type-safe error codes, and consistent HTTP response mappings for robust authentication workflows.

## Installation

```bash
npm install @khni/auth-errors
pnpm add  @khni/auth-errors
yarn add  @khni/auth-errors
```

## Features

- 🏷️ **Type-safe error codes** with full TypeScript support
- 🎯 **Separated concerns** - Authentication and OTP errors in separate modules
- 📊 **Domain vs Unexpected errors** - Clear distinction between user-facing and system errors
- 🔧 **Factory patterns** - Consistent error creation with utilities
- 📝 **Comprehensive documentation** - Full JSDoc support for API Extractor
- 🚦 **HTTP status mapping** - Automatic status code and message mapping
- 🛡️ **Type guards** - Runtime error type checking

## Quick Start

```typescript
import {
  AuthDomainError,
  AuthUnexpectedError,
  OtpDomainError,
  AuthErrorCodes,
  OtpErrorCodes,
} from "@khni/auth-errors";

// Throw authentication domain errors
if (emailAlreadyExists) {
  throw new AuthDomainError(AuthErrorCodes.AUTH_USED_EMAIL);
}

// Throw OTP domain errors
if (otpIsInvalid) {
  throw new OtpDomainError(OtpErrorCodes.OTP_INVALID);
}

// Throw unexpected errors with original cause
try {
  await createUser(userData);
} catch (error) {
  throw new AuthUnexpectedError(
    AuthErrorCodes.AUTH_USER_CREATION_FAILED,
    error
  );
}
```

## Error Categories

### Authentication Errors

**Domain Errors** (User-facing, expected):

- `AUTH_USED_EMAIL` - Email already registered
- `INCORRECT_CREDENTIALS` - Invalid email/password
- `INVALID_ACCESS_TOKEN` - Malformed or invalid JWT
- `REFRESH_TOKEN_INVALID` - Expired or revoked refresh token
- And [15+ more...](#authentication-error-codes)

**Unexpected Errors** (System-level):

- `AUTH_USER_CREATION_FAILED` - Database failure during user creation
- `FINDING_USER_FAILED` - User search operation failed
- `ISSUE_TOKEN_FAILED` - JWT generation failure
- And [7+ more...](#authentication-error-codes)

### OTP Errors

**Domain Errors** (User-facing, expected):

- `OTP_INVALID` - Incorrect OTP code
- `OTP_EXPIRED` - OTP code has expired
- `OTP_TOKEN_INVALID` - Invalid OTP session token

**Unexpected Errors** (System-level):

- `OTP_CREATION_FAILED` - OTP generation service failure
- `OTP_VERIFICATION_FAILED` - OTP validation service failure

## Usage Examples

### Basic Error Throwing

```typescript
import {
  AuthDomainError,
  AuthUnexpectedError,
  OtpDomainError,
  AuthErrorCodes,
  OtpErrorCodes,
} from "@khni/auth-errors";

// Authentication domain errors
function registerUser(email: string) {
  if (await userExists(email)) {
    throw new AuthDomainError(
      AuthErrorCodes.AUTH_USED_EMAIL,
      `Email ${email} is already registered`,
      { email, source: "registration" }
    );
  }
}

// OTP domain errors
function verifyOtp(userId: string, otpCode: string) {
  const storedOtp = await getStoredOtp(userId);
  if (storedOtp.code !== otpCode) {
    throw new OtpDomainError(
      OtpErrorCodes.OTP_INVALID,
      "Invalid verification code",
      { userId, attempts: storedOtp.attempts }
    );
  }
}

// Unexpected errors with cause
async function resetPassword(userId: string, newPassword: string) {
  try {
    await updatePassword(userId, newPassword);
  } catch (error) {
    throw new AuthUnexpectedError(
      AuthErrorCodes.PASSWORD_RESET_FAILED,
      error,
      "Password reset operation failed",
      { userId, timestamp: new Date() }
    );
  }
}
```

### Using Factory Methods

```typescript
import { AuthErrorFactories, OtpErrorFactories } from "@khni/auth-errors";

// Simplified error creation
function authenticateUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw AuthErrorFactories.domain("USER_IS_NOT_EXIST", { email });
  }

  if (!user.verified) {
    throw AuthErrorFactories.domain("AUTH_UNVERIFIED_EMAIL", {
      userId: user.id,
    });
  }

  if (otpAttempts > 3) {
    throw OtpErrorFactories.domain("OTP_INVALID", {
      userId: user.id,
      attempts: otpAttempts,
    });
  }
}
```

### Error Handling in Express

```typescript
import {
  AuthError,
  OtpError,
  isAuthDomainError,
  isOtpDomainError,
  getAuthErrorResponse,
  getOtpErrorResponse,
} from "@khni/auth-errors";

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // Handle authentication errors
  if (error instanceof AuthError) {
    const config = getAuthErrorResponse(error.code);

    if (isAuthDomainError(error)) {
      // Log domain errors as warnings
      logger.warn("Auth domain error", { code: error.code, meta: error.meta });
    } else {
      // Log unexpected errors with full details
      logger.error("Auth unexpected error", {
        code: error.code,
        cause: error.cause,
        meta: error.meta,
      });
    }

    return res.status(config.statusCode).json({
      error: config.responseMessage,
      code: error.code,
    });
  }

  // Handle OTP errors
  if (error instanceof OtpError) {
    const config = getOtpErrorResponse(error.code);

    if (isOtpDomainError(error)) {
      logger.warn("OTP domain error", { code: error.code, meta: error.meta });
    } else {
      logger.error("OTP unexpected error", {
        code: error.code,
        cause: error.cause,
        meta: error.meta,
      });
    }

    return res.status(config.statusCode).json({
      error: config.responseMessage,
      code: error.code,
    });
  }

  // Handle other errors
  next(error);
});
```

## API Reference

### Core Classes

#### `AuthError`

Base class for all authentication errors.

#### `AuthDomainError`

Expected business logic errors during authentication.

#### `AuthUnexpectedError`

System-level failures during authentication.

#### `OtpError`

Base class for all OTP errors.

#### `OtpDomainError`

Expected business logic errors during OTP operations.

#### `OtpUnexpectedError`

System-level failures during OTP operations.

### Utility Functions

#### `getAuthErrorResponse(code: AuthErrorCodesType)`

Returns HTTP status code and message for authentication errors.

#### `getOtpErrorResponse(code: OtpErrorCodesType)`

Returns HTTP status code and message for OTP errors.

#### Type Guards

- `isAuthDomainError(error: unknown)`
- `isAuthUnexpectedError(error: unknown)`
- `isOtpDomainError(error: unknown)`
- `isOtpUnexpectedError(error: unknown)`

### Factory Classes

#### `AuthErrorFactories`

- `.domain(code, meta?)` - Create domain errors
- `.unexpected(code, cause, meta?)` - Create unexpected errors

#### `OtpErrorFactories`

- `.domain(code, meta?)` - Create domain errors
- `.unexpected(code, cause, meta?)` - Create unexpected errors

## Error Codes Reference

### Authentication Error Codes

#### Domain Errors

| Code                    | HTTP Status | Message                             | Description                      |
| ----------------------- | ----------- | ----------------------------------- | -------------------------------- |
| `AUTH_USED_EMAIL`       | 409         | Email already registered            | Email exists during registration |
| `AUTH_USED_IDENTIFIER`  | 409         | Identifier already registered       | Username/identifier taken        |
| `AUTH_UNVERIFIED_EMAIL` | 403         | Email verification required         | User needs to verify email       |
| `INCORRECT_CREDENTIALS` | 401         | Invalid credentials                 | Wrong email/password             |
| `USER_NOT_LOCAL`        | 400         | External authentication required    | OAuth user tried local auth      |
| `REFRESH_TOKEN_INVALID` | 401         | Refresh token is invalid or expired | Refresh token validation failed  |
| `INVALID_ACCESS_TOKEN`  | 401         | Access token is invalid or expired  | Malformed JWT token              |
| `EXPIRED_ACCESS_TOKEN`  | 401         | Access token is expired             | JWT token expired                |
| `MISSING_ACCESS_TOKEN`  | 401         | Access token is missing             | No Authorization header          |
| `MISSING_REFRESH_TOKEN` | 400         | You are already logged out          | No refresh token during logout   |
| `USER_IS_NOT_EXIST`     | 400         | Email does not exist                | User not found                   |

#### Unexpected Errors

| Code                         | HTTP Status | Message                                     | Description                       |
| ---------------------------- | ----------- | ------------------------------------------- | --------------------------------- |
| `FINDING_USER_FAILED`        | 500         | Something went wrong while finding the user | Database search failure           |
| `AUTH_USER_CREATION_FAILED`  | 500         | Account creation failed                     | User creation database failure    |
| `ISSUE_TOKEN_FAILED`         | 400         | Unexpected error while issuing tokens       | JWT generation failure            |
| `PASSWORD_RESET_FAILED`      | 500         | Password Reset Failed                       | Password update operation failed  |
| `REFRESHTOKEN_REVOKE_FAILED` | 500         | Failed to Logout                            | Refresh token revocation failed   |
| `REFRESHTOKEN_CREATE_FAILED` | 500         | Failed to create refresh token              | Refresh token creation failed     |
| `REFRESHTOKEN_VERIFY_FAILED` | 500         | Failed to verify refresh token              | Refresh token verification failed |
| `LOGIN_FAILED`               | 500         | Something went wrong while login            | General login process failure     |

### OTP Error Codes

#### Domain Errors

| Code                | HTTP Status | Message                          | Description                  |
| ------------------- | ----------- | -------------------------------- | ---------------------------- |
| `OTP_INVALID`       | 401         | The OTP you entered is incorrect | Wrong OTP code provided      |
| `OTP_EXPIRED`       | 401         | The OTP is expired               | OTP code has expired         |
| `TOKEN_EXPIRED`     | 401         | Token is expired                 | OTP session token expired    |
| `OTP_TOKEN_INVALID` | 401         | Please request new OTP           | Invalid or expired OTP token |

#### Unexpected Errors

| Code                      | HTTP Status | Message                                  | Description                    |
| ------------------------- | ----------- | ---------------------------------------- | ------------------------------ |
| `OTP_CREATION_FAILED`     | 500         | Something went wrong while creating OTP  | OTP generation service failure |
| `OTP_VERIFICATION_FAILED` | 500         | Something went wrong while verifying OTP | OTP validation service failure |

## Best Practices

### 1. Error Handling Strategy

```typescript
// Use domain errors for business logic
if (!user.exists) {
  throw new AuthDomainError("USER_IS_NOT_EXIST");
}

// Use unexpected errors for system failures
try {
  await databaseOperation();
} catch (error) {
  throw new AuthUnexpectedError("FINDING_USER_FAILED", error);
}
```

### 2. Metadata for Debugging

```typescript
// Include relevant context in meta
throw new AuthDomainError("INCORRECT_CREDENTIALS", "Multiple failed attempts", {
  userId: user.id,
  attempts: loginAttempts,
  ip: request.ip,
});
```

### 3. Error Recovery

```typescript
import { isOtpDomainError } from "@khni/auth-errors";

try {
  await verifyOtp(userId, otpCode);
} catch (error) {
  if (isOtpDomainError(error)) {
    // User can retry with new OTP
    return res.status(401).json({
      error: error.message,
      canRetry: true,
    });
  }
  throw error; // Re-throw unexpected errors
}
```

## Integration with Logging

```typescript
import {
  AuthError,
  isAuthDomainError,
  isAuthUnexpectedError,
} from "@khni/auth-errors";

function logAuthError(error: AuthError) {
  if (isAuthDomainError(error)) {
    logger.warn("Authentication domain error", {
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
  } else if (isAuthUnexpectedError(error)) {
    logger.error("Authentication system error", {
      code: error.code,
      message: error.message,
      cause: error.cause,
      meta: error.meta,
      stack: error.stack,
    });

    // Send to error monitoring service
    sentry.captureException(error);
  }
}
```

## Migration Guide

### From v1 to v2

If you're migrating from a previous version:

1. **Import paths changed**:

   ```typescript
   // Before
   import { AuthError } from "@khni/auth-errors";

   // After
   import { AuthError } from "@khni/auth-errors";
   // Paths remain the same but internal structure changed
   ```

2. **Error code constants are now enums**:

   ```typescript
   // Before
   throw new Error("USER_NOT_FOUND");

   // After
   throw new AuthDomainError(AuthErrorCodes.USER_IS_NOT_EXIST);
   ```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-error-codes`
3. Commit your changes: `git commit -am 'Add new error codes'`
4. Push to the branch: `git push origin feature/new-error-codes`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- 📚 [Full API Documentation](./docs/api/README.md)
- 🐛 [Issue Tracker](https://github.com/khni/auth-errors/issues)
- 💬 [Discussions](https://github.com/khni/auth-errors/discussions)
