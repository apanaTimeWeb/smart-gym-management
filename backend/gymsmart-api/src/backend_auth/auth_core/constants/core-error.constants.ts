// RESPONSIBILITY: Defines infrastructure error categories, machine-readable error codes and canonical core messages.
// FLOW: Core exception/filter/interceptor -> CoreErrorConstants -> canonical API error contract.

export const CoreErrorConstants = {
  NAME: {
    VALIDATION: 'VALIDATION_ERROR',
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
  },
  CODE: {
    VALIDATION_DTO_FAILED: 'VALIDATION.DTO.FAILED',
    REQUEST_INVALID: 'CORE.REQUEST.INVALID',
    RATE_LIMITED: 'CORE.RATE_LIMIT.RATE_LIMITED',
    INTERNAL_ERROR: 'CORE.INTERNAL.ERROR',
    HTTP_TIMEOUT: 'CORE.HTTP.REQUEST_TIMEOUT',
  },
  MESSAGE: {
    SUCCESS: 'Request completed successfully.',
    VALIDATION: 'Validation failed. Please check the highlighted fields.',
    INTERNAL_ERROR: 'An unexpected error occurred.',
    REQUEST_TIMEOUT: 'Request exceeded the synchronous SLA.',
    RATE_LIMITED: 'Rate limit exceeded.',
    AUTHENTICATION_REQUIRED: 'Authentication is required.',
    INVALID_ACCESS_TOKEN: 'Access token is invalid or expired.',
    REQUIRED_ROLE_MISSING: 'You do not have permission to perform this action.',
  },
} as const;
