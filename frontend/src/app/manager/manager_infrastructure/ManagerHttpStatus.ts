// RESPONSIBILITY: Named HTTP status codes used by Manager-owned MSW failure scenarios.
import { StatusCodes } from 'http-status-codes';

export const MANAGER_HTTP_STATUS = {
  NOT_FOUND: StatusCodes.NOT_FOUND,
  FORBIDDEN: StatusCodes.FORBIDDEN,
  UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR } as const;
