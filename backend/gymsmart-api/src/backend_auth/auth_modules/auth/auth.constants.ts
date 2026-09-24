// RESPONSIBILITY: Centralizes Auth messages, machine-readable error codes, audit actions and security thresholds.
// FLOW: Auth controllers/services -> AuthConstants -> API/audit/Redis behavior.

export const AuthConstants = {
  MESSAGE: {
    LOGIN_SUCCESS: 'Login successful',
    REFRESH_SUCCESS: 'Session refreshed',
    ME_SUCCESS: 'Session identity',
    LOGOUT_SUCCESS: 'Logged out successfully',
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
    LOCKED: 'Too many failed login attempts. Please try again later.',
    REFRESH_REJECTED: 'Your refresh session is no longer valid.',
    USER_DISABLED: 'This user account is disabled.',
  },
  CODE: {
    LOGIN_BACKEND_REJECTED: 'AUTH.LOGIN.BACKEND_REJECTED',
    REFRESH_MISSING_TOKEN: 'AUTH.REFRESH.MISSING_TOKEN',
    REFRESH_REJECTED: 'AUTH.REFRESH.REJECTED',
    REFRESH_REUSE: 'AUTH.REFRESH.REUSE_DETECTED',
    USER_NOT_FOUND: 'AUTH.USER.NOT_FOUND',
    USER_DISABLED: 'AUTH.USER.DISABLED',
    ACCOUNT_LOCKED: 'AUTH.ACCOUNT.LOCKED',
  },

  LOCKOUT: {
    KEY_PREFIX: 'auth:lockout:',
    ATTEMPT_KEY_PREFIX: 'auth:attempts:',
  },
  REVOCATION: {
    REFRESH_REVOKED_KEY_PREFIX: 'auth:refresh-revoked:',
  },
  AUDIT: {
    LOGIN_SUCCESS: 'AUTH.LOGIN.SUCCESS',
    LOGIN_FAILED: 'AUTH.LOGIN.FAILED',
    ACCOUNT_LOCKED: 'AUTH.ACCOUNT.LOCKED',
    REFRESH_ROTATED: 'AUTH.REFRESH.ROTATED',
    REFRESH_REUSE: 'AUTH.REFRESH.REUSE_DETECTED',
    LOGOUT: 'AUTH.LOGOUT.SUCCESS',
  },
} as const;
