/**
 * RESPONSIBILITY: Centralizes Auth error categories, machine-readable codes, and user-safe fallback messages.
 * DATA FLOW: Route failure -> canonical error code/category -> UI-safe error response.
 */
export const AuthErrorConstants = {
  NAME: {
    VALIDATION: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
    UPSTREAM_UNAVAILABLE: 'UPSTREAM_UNAVAILABLE',
    ENDPOINT_RETIRED: 'ENDPOINT_RETIRED',
  },
  CODE: {
    INVALID_REQUEST: 'AUTH.LOGIN.INVALID_REQUEST',
    INVALID_INPUT: 'AUTH.LOGIN.INVALID_INPUT',
    BACKEND_REJECTED: 'AUTH.LOGIN.BACKEND_REJECTED',
    UPSTREAM_UNAVAILABLE: 'AUTH.LOGIN.UPSTREAM_UNAVAILABLE',
    REFRESH_MISSING_TOKEN: 'AUTH.REFRESH.MISSING_TOKEN',
    REFRESH_REJECTED: 'AUTH.REFRESH.REJECTED',
    REFRESH_UPSTREAM_UNAVAILABLE: 'AUTH.REFRESH.UPSTREAM_UNAVAILABLE',
    GHOST_NO_ORIGINAL_SESSION: 'AUTH.GHOST_RESTORE.NO_ORIGINAL_SESSION',
    SESSION_SET_COOKIE_RETIRED: 'AUTH.SESSION.SET_COOKIE_RETIRED',
  },
  MESSAGE: {
    INVALID_REQUEST: 'Invalid login request.',
    INVALID_INPUT: 'Please correct the highlighted fields.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
    UPSTREAM_UNAVAILABLE: 'Authentication service is temporarily unavailable. Please try again.',
    GHOST_NO_SESSION: 'No original session is available to restore.',
    SET_COOKIE_RETIRED: 'Direct session cookie writes are disabled. Use the Auth session endpoint.',
  },
} as const;
