// RESPONSIBILITY: Converts unhandled HTTP/application errors into the canonical ApiResponse error envelope.
// FLOW: Exception â†’ AdminCoreHttpExceptionFilter â†’ errorCode/statusCode/message â†’ frontend.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { normalizeCoreErrorCode } from '@/backend_admin/admin_core/admin_core_response/admin-core-error-code.js';

import type { Response } from 'express';

@Catch(HttpException)
/**
 * @description Defines the AdminCoreHttpExceptionFilter boundary for the admin_core_response backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = exception.getStatus();
    const payload = exception.getResponse();
    const message = typeof payload === 'string' ? payload : ((payload as { message?: string | string[] }).message ?? 'Request failed.');
    const errorName = typeof payload === 'object' && payload !== null && 'error' in payload
      ? String((payload as { error?: unknown }).error)
      : HttpStatus[statusCode] ?? 'HTTP_ERROR';
    const errorCode = normalizeCoreErrorCode(typeof payload === 'object' && payload !== null && 'errorCode' in payload ? String((payload as { errorCode?: unknown }).errorCode) : `HTTP.REQUEST.${statusCode}`);

    response.status(statusCode).json({
      success: false,
      message: Array.isArray(message) ? message.join('; ') : message,
      data: null,
      error: errorName,
      errorCode,
      statusCode,
    });
  }
}
