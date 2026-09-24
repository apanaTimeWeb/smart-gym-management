// RESPONSIBILITY: Defines Auth-specific exceptions with stable HTTP statuses and machine-readable codes.
// FLOW: Auth service/repository failure -> Auth exception -> global error filter -> frontend envelope.

import { HttpStatus } from '@nestjs/common';

import { CoreAppException } from '@/backend_auth/auth_core/exceptions/core-app.exception';
import { AuthConstants } from '@/backend_auth/auth_modules/auth/auth.constants';
export class AuthInvalidCredentialsException extends CoreAppException {
  constructor() { super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', AuthConstants.CODE.LOGIN_BACKEND_REJECTED, AuthConstants.ERROR.INVALID_CREDENTIALS); }
}

export class AuthAccountLockedException extends CoreAppException {
  constructor() { super(HttpStatus.LOCKED, 'ACCOUNT_LOCKED', AuthConstants.CODE.ACCOUNT_LOCKED, AuthConstants.ERROR.LOCKED); }
}

export class AuthRefreshMissingTokenException extends CoreAppException {
  constructor() { super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', AuthConstants.CODE.REFRESH_MISSING_TOKEN, AuthConstants.ERROR.SESSION_EXPIRED); }
}

export class AuthRefreshRejectedException extends CoreAppException {
  constructor() { super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', AuthConstants.CODE.REFRESH_REJECTED, AuthConstants.ERROR.REFRESH_REJECTED); }
}

export class AuthContextUnavailableException extends CoreAppException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_ERROR', 'CORE.AUTH.CONTEXT_UNAVAILABLE', 'Authenticated user context is unavailable.');
  }
}

export class AuthRefreshReuseDetectedException extends CoreAppException {
  constructor(public readonly userId: string, public readonly sessionId: string) {
    super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', AuthConstants.CODE.REFRESH_REUSE, AuthConstants.ERROR.REFRESH_REJECTED);
  }
}

export class AuthUserDisabledException extends CoreAppException {
  constructor() { super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', AuthConstants.CODE.USER_DISABLED, AuthConstants.ERROR.USER_DISABLED); }
}

export class AuthUserNotFoundException extends CoreAppException {
  constructor() { super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', AuthConstants.CODE.USER_NOT_FOUND, AuthConstants.ERROR.SESSION_EXPIRED); }
}
