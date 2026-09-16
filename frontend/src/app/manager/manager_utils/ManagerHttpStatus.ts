// RESPONSIBILITY: Named HTTP status codes used by Manager-owned MSW failure scenarios.
export const MANAGER_HTTP_STATUS = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
} as const;
